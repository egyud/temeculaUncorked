const mongoose = require('mongoose')

const WineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: String,
  clubPrice: String,
  avgRating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  winery: String,
  description: String,
  category: String
})

module.exports = mongoose.model('Wine', WineSchema)