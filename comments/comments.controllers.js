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

exports.postCommentForEvent = async (req, res) => {
  const { text, userId, eventId } = req.body
  try {
    let comment = await Comment.create({
      userId,
      eventId,
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
    // check to see if user has already liked the comment.  if yes, don't do anything.  If not, add their like to the likes array.
    const hasLiked = await Comment.findOne({ likes: userId })
    if (hasLiked) {
      console.log('hasLiked')
      console.log(hasLiked)
      // if user has already liked, remove them from the likes array
      let comment = await Comment.updateOne({ _id: commentId }, { $pull: { likes: userId } })
      return res.send({ comment, message: 
      'Removed your like' })
    }
    let comment = await Comment.updateOne({ _id: commentId }, { $push: { likes: userId } })
    return res.status(200).send({ comment })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}