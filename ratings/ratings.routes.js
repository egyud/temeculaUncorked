const express = require('express')
const router = express.Router()

const RatingsController = require('./ratings.controller')

// post /api/ratings/:wineId
router.post('/:wineId', RatingsController.postWineRating)

// get /api/ratings/:userId
router.get('/:userId', RatingsController.getUserWineRatings)

// get /api/ratings/:wineId/:userId
router.get('/:wineId/:userId', RatingsController.getUserRating)

module.exports = router