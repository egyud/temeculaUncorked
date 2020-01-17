const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const WineClubSchema = new mongoose.Schema({
  name: String,
  tastings: String,
  discounts: Array,
  shipments: String,
  otherBenefits: Array,
  avgPrice: String
})

const WinerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: String,
  avgRating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  hours: {
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
    Sunday: String,
  },
  wines: [{
    type: ObjectId,
    ref: 'Wine'
  }],
  wineClubs: [WineClubSchema],
  hasRestaurant: Boolean,
  keywords: Array,
  hasLiveMusic: Boolean,
  phone: String
})

module.exports = mongoose.model('Winery', WinerySchema)