const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
  reactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  reactionBody: {
    type: String,
    required: true,
    unique: true
  }, 
  username: {
    type: String,
    required: true 
   },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
  },
});

ReactionSchema.virtual('friendCount').get(() => {
  return this.friends? this.friends.length : 0;
});

const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;