const Comment = require('./comment.model')

exports.postComment = async (req, res) => {
  const { text, userId, reviewId } = req.body
  try {
    let comment = await Comment.create({
      userId,
      reviewId,
      text
    })
    return res.status(200).send({ 
      comment,
      message: 'Your comment was successfully submitted.  It may take a few minutes to appear.'
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ 
      message: 'There was an error submitting your comment.'
    })
  }
}

exports.postCommentForEvent = async (req, res) => {
  const { text, userId, eventId } = req.body
  try {
    let comment = await Comment.create({
      userId,
      eventId,
      text
    })
    return res.status(200).send({ 
      comment,
      message: 'Your comment was successfully submitted.  It may take a few minutes to appear.'
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'There was an error submitting your comment.' })
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

exports.getCommentsForEvent = async (req, res) => {
  const { eventId } = req.params
  try {
    let comments = await Comment
      .find({ eventId })
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
 
    const comment = await Comment.findOne({ _id: commentId })

    // check to see if user already has liked the comment
    if (comment.likes.includes(userId)) {
      // if user has already liked, remove them from the likes array
      let updatedComment = await Comment.updateOne({ _id: commentId }, { $pull: { likes: userId } })
      return res.send({ updatedComment, message: 
      'Removed your like' })
    }
    // add the userId to the likes array in comment
    let updatedComment = await Comment.updateOne({ _id: commentId }, { $push: { likes: userId } })
    return res.status(200).send({ updatedComment })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}