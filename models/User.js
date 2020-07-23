const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }, 
  thoughts: [

  ],
  friends: [

  ]
});

UserSchema.virtual('friendCount').get(() => {
  return this.friends? this.friends.length : 0;
});

const User = model('User', UserSchema);
module.exports = User;