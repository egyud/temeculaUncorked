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

// router.get('/winery/:name', ReviewsController.getWineryReviews)

// // post reviews/wine/:winery/:name
// router.post('/wine/:winery/:name', ReviewsController.postWineReview)

// // get all reviews for specific winery
// router.get('/winery/:name', ReviewsController.getWineryReviews)

// // get all reviews for specific wine
// router.get('/wine/:winery/:name', ReviewsController.getWineReviews)

// // update individual winery review
// router.patch('/winery/:name/:reviewId', ReviewsController.updateWineryReview)

// // update individual wine review
// router.patch('/wine/:winery/:name/:reviewId', ReviewsController.updateWineReview)

// // delete individual winery review
// router.delete('/winery/:name/:reviewId', ReviewsController.deleteWineryReview)

// // delete individual wine review
// router.delete('/wine/:winery/:name/:reviewId', ReviewsController.deleteWineReview)

module.exports = router