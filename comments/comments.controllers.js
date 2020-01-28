const Comment = require('./comment.model')

exports.postComment = async (req, res) => {
  const { text, userId, reviewId } = req.body
  try {
    let comment = await Comment.create({
      userId,
      reviewId,
      text
    })
    return res.status(200).send({ comment })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Error creating the comment' })
  }
}

exports.getCommentsForReview = async (req, res) => {
  const { reviewId } = req.params
  try {
    let comments = await Comment
      .find({ reviewId })
      .populate('userId', 'name avatar')
      .populate('likes', 'name')
      .sort({ timestamp: 1 })

    return res.status(200).send({ comments })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Error getting the comments' })
  }
}