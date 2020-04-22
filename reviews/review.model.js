const mongoose = require('mongoose')
const user = require('../users/user.model')
const winery = require('../wineries/winery.model')
const ObjectId = mongoose.Schema.Types.ObjectId

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: ObjectId, 
    ref: 'User',
    required: true,
    index: true
  },
  reviewedId: {
    type: ObjectId,
    ref: 'Winery',
    required: true,
  },
  rating: {
    type: Number,
    required: true
  }, 
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
  }]
})

module.exports = mongoose.model('Review', ReviewSchema)