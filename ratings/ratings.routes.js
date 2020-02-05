const express = require('express')
const router = express.Router()

const RatingsController = require('./ratings.controller')

// post /api/ratings/
router.post('/', RatingsController.postWineRating)

// get /api/ratings/recent/:wineId
router.get('/recent/:wineId', RatingsController.getRecentWineRatings)

// get /api/ratings/:wineId/:userId
router.get('/:wineId/:userId', RatingsController.getUserRating)

// get /api/ratings/:userId
router.get('/:userId', RatingsController.getUserWineRatings)



module.exports = router