const express = require('express')
const router = express.Router()

const CommentsControllers = require('./comments.controllers')

// post /api/comments/
router.post('/', CommentsControllers.postComment)

// get /api/comments/:reviewId
router.get('/:reviewId', CommentsControllers.getCommentsForReview)

// post /api/comments/like
router.post('/like', CommentsControllers.postLike)

module.exports = router