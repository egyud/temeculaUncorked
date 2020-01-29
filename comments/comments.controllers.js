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

exports.postLike = async (req, res) => {
  const { userId, commentId } = req.body
  try {
    // check to see if user has already liked the comment.  if yes, don't do anything.  If not, add their like to the likes array.
    const hasLiked = await Comment.findOne({ likes: userId })
    if (hasLiked) {
      console.log('hasLiked')
      console.log(hasLiked)
      return res.send({ message: "You've already liked this comment" })
    }
    let comment = await Comment.updateOne({ _id: commentId }, { $push: { likes: userId } })
    return res.status(200).send({ comment })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}