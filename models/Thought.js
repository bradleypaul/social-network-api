const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
   type: String,
   required: true 
  },
  reactions: [
    //reactionschema documents
  ]
});

ThoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions? this.reactions.length : 0;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;