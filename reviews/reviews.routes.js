const express = require('express')
const router = express.Router()

const ReviewsController = require('./reviews.controller')

// get reviews/winery
router.get('/winery', ReviewsController.getAllWineryReviews)

// post reviews/winery
router.post('/winery', ReviewsController.postWineryReview)

router.get('/winery/recent', ReviewsController.getRecentWineryReviews)

router.get('/:userId', ReviewsController.getUserWineryReviews)

router.post('/like', ReviewsController.postLike)

router.get('/:wineryId/:userId', ReviewsController.getUserReview)

module.exports = router