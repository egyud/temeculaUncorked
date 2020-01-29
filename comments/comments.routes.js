const express = require('express')
const router = express.Router()

const CommentsControllers = require('./comments.controllers')

// post /api/comments/
router.post('/', CommentsControllers.postComment)

// post /api/comments/event
router.post('/event', CommentsControllers.postCommentForEvent)

// get /api/comments/review/:reviewId
router.get('/review/:reviewId', CommentsControllers.getCommentsForReview)

// get /api/comments/event/:eventId
router.get('/event/:eventId', CommentsControllers.getCommentsForEvent)

// post /api/comments/like
router.post('/like', CommentsControllers.postLike)

module.exports = router