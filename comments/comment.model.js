const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User',
  }],
  reviewId: {
    type: ObjectId,
    ref: 'Review'
  },
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  eventId: {
    type: ObjectId,
    ref: 'Event'
  }
})

module.exports = mongoose.model('Comment', CommentSchema)