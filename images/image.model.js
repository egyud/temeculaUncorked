const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ImageSchema = new mongoose.Schema({
  winery: {
    type: ObjectId,
    ref: 'Winery',
    trim: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    trim: true
  },
  url: String,
  publicId: String,
  caption: String
})

module.exports = mongoose.model('Image', ImageSchema)