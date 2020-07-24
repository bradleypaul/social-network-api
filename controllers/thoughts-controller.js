const { Thought, User } = require('../models');

const thoughtController = {
  getAll(_, res) {
    Thought.find({})
      .select('-__V')
      .sort({ _id: -1 })
      .then(records => res.json(records))
      .catch(err => res.status(400).json(err));
  },

  getById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__V')
      .then(record => {
        if (!record) {
          res.status(404).json({
            message: 'No thought found with this id!'
          })
          return;
        }
        res.json(record);
      })
      .catch(err => res.status(400).json(err));
  },

  create({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      })
      .then(record => {
        if (!record) {
          res.status(404).json({
            message: 'No user found with this id!'
          })
          return;
        }
        res.json(record);
      })
      .catch(err => res.status(400).json(err));
  },

  update({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
    )
      .then(record => {
        if (!record) {
          res.status(404).json({
            message: 'No thought found with this id!'
          })
          return;
        }
        res.json(record);
      })
      .catch(err => res.status(400).json(err));
  },

  destroy({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(record => {
        if (!record) {
          res.status(404).json({
            message: 'No thought found with this id!'
          })
          return;
        }
        res.json(record);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
    .then(record => {
      if (!record) {
        res.status(404).json({
          message: 'No thought found with this id!'
        })
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  },

  removeReaction({params}, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId},
      {$pull: { reactions: {reactionId: params.reactionId}}},
      {new: true}
    ).then(record => {
      if (!record) {
        res.status(404).json({
          message: 'No thought found with this id!'
        })
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  }
}

module.exports = thoughtController;