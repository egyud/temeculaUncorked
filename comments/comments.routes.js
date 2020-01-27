const express = require('express')
const router = express.Router()

const CommentsControllers = require('./comments.controllers')

// post /api/comments/
router.post('/', CommentsControllers.postComment)

// get /api/comments/:reviewId
router.get('/:reviewId', CommentsControllers.getCommentsForReview)

module.exports = router