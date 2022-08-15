const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: 'reactions' })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // get single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: 'reactions' })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'no Thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create Thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought => {
      User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
      ).then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)).catch((err) => res.status(500).json(err));
    })).catch(err => res.status(400).json(err));
  },  
      
  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought => {
      User.findOneAndUpdate(
        { _id: body.userId },
        { $pull: { thoughts: thought._id } },
        { runValidators: true, new: true }
      ).then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)).catch((err) => res.status(500).json(err));
    })).catch(err => res.status(400).json(err));
  },
  // Update a Thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // add friend
  addReaction(req, res) {
    // console.log('you are adding a friend');
    // console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    ).then((thought) => !thought
      ? res.status(404).json({ message: 'no thought found with that ID'})
      : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
  // remove friend
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { runValidators: true, new: true }
    ).then((thought) => !thought
      ? res.status(404).json({ message: 'no thought found with that ID'})
      : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
}