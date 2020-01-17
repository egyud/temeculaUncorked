const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const RatingSchema = new mongoose.Schema({
  userId: {
    type: ObjectId, 
    ref: 'User',
    required: true
  },
  wineId: {
    type: ObjectId,
    ref: 'Wine',
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Rating', RatingSchema)