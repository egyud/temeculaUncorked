const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  winery: {
    type: String,
    require: true
  },
  // array of users that are attending the event
  attending: [{
    type: ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('Event', EventSchema)