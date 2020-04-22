const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  // an array of wineries that they are a member of
  memberOf: [{
    type: ObjectId,
    ref: 'Winery'
  }],
  bio: String,
  link: String,
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
  avatar: {
    url: String,
    public_id: String
  }
})

module.exports = mongoose.model('User', UserSchema)