const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// const ReactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       validate: [
//         val => val.length <= 280,
//         "Invalid length"
//       ]
//     },
//     username: {
//       type: String,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')
//     },
//   },
//   {
//     toJSON: {
//       getters: true,
//     }
//   }
// );

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      validate: [
        val => val.length >= 1 && val.length <= 280,
        "Invalid length"
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: val => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true
    },
    // reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(() => {
  return this.reactions ? this.reactions.length : 0;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;