const Review = require('./review.model')
const Winery = require('../wineries/winery.model')

exports.postWineryReview = async (req, res) => {
  const { user, reviewText, winery, rating } = req.body
  let wineryId
  
  try {
    console.log('in postWineryReview')
    if (user && reviewText && winery) {
      wineryId = await Winery.find({name: winery}, '_id')
      console.log(user)
      console.log(wineryId[0]._id)
      const review = await Review.create({
        userId: user._id,
        reviewedId: wineryId[0]._id,
        text: reviewText,
        rating
      })

      // update the rating count and average on winery model
      const updatedWinery = await Winery.updateOne({ _id: wineryId }, { $inc: { avgRating: rating, reviewCount: 1 } })
  
  
      return res.status(200).send({ review, updatedWinery })
    }

  } catch(error) {
    console.error(error)
    return res.status(400).send({ message: 'Error creating the post' })
  }
}

exports.getAllWineryReviews = async (req, res) => {
  try {
    const reviews = await Review
        .find({})
        .populate('userId', 'name avatar')
        .populate('reviewedId', 'name')
        .sort({ timestamp: -1 })
    return res.status(200).send({ reviews })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getRecentWineryReviews = async (req, res) => {
  try {
    const reviews = await Review
      .find({})
      .populate('userId', 'name avatar')
      .populate('reviewedId', 'name')
      .sort({ timestamp: -1 })
      .limit(5)
    return res.status(200).send({
      reviews
    })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getUserWineryReviews = async (req, res) => {
  const { userId } = req.params
  try {
    const reviews = await Review
      .find({ userId })
      .populate('userId', 'name avatar')
      .populate('reviewedId', 'name')
      .sort({ timestamp: -1 })
    return res.status(200).send({ reviews })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.postLike = async (req, res) => {
  const { userId, reviewId } = req.body
  try {

    const review = await Comment.findOne({ _id: reviewId })
    // check to see if user has already liked the review
    if (review.likes.includes(userId)) {
      // if user has already liked, remove them from the likes array
      let updatedReview = await Review.updateOne({ _id: reviewId }, { $pull: { likes: userId } })
      return res.send({ updatedReview, message: 
      'Removed your like' })
    }
    // add the userId to the likes array in review
    let updatedReview = await Review.updateOne({ _id: reviewId }, { $push: { likes: userId } })
    return res.status(200).send({ updatedReview })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}