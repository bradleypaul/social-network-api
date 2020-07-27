const { User } = require('../models');

const userController = {
  getAll(_, res) {
    User.find({})
    .select('-__v')
    .then(records => res.json(records))
    .catch(err => res.status(400).json(err));
  },

  getById({ params }, res) {
    User.findOne({_id: params.id})
    .select('-__v')
    .then(record => {
      if(!record) {
        res.status(404).json({
          message: 'No user found with this id!'
        });
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  },

  create({ body }, res) {
    User.create(body)
    .then(record => res.json(record))
    .catch(err => res.status(400).json(err));
  },

  update({ params, body }, res) {
    User.findOneAndUpdate({_id: params.id}, body, {new: true})
    .then(record => {
      if(!record) {
        res.status(404).json({message: 'No user found'});
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  },

  destroy({ params }, res) {
    User.findOneAndDelete({_id: params.id})
    .then(record => {
      if(!record) {
        res.status(404).json({message: 'No user found'});
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  },

  addFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      { $push: { friends: params.friendId} },
      { new: true }
    )
    .then(record => {
      if(!record) {
        res.status(404).json({message: 'No user found'});
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  },
  
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: {friends: params.friendId } },
      { new: true}
    )
    .then(record => {
      if(!record) {
        res.status(404).json({message: 'No user found'});
        return;
      }
      res.json(record);
    })
    .catch(err => res.status(400).json(err));
  }
}

module.exports = userController;