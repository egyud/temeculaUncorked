const Rating = require('./rating.model')
const Wine = require('../wines/wine.model')


exports.postWineRating = async (req, res) => {
  const { userId, rating, wineId } = req.body
  try {
    // check to see if user has already rated wine
    const hasRated = await Rating.findOne({ userId, wineId })
    if (hasRated) {
      console.log('hasRated')
      console.log(hasRated)
      // check to see if rating is the same as previous, if so, don't do anything
      if (hasRated.rating === rating) {
        return res.send({ message: 'Nothing changed, rated same as previously' })
      }
      // determine the difference between the new and previous rating(used for updating the total ratingValue in Wine doc)
      let ratingDif = rating - hasRated.rating
      // update the existing rating
      const updatedRating = await Rating.updateOne({userId, wineId}, { $set: { rating } })
      const updatedWine = await Wine.updateOne({ _id: wineId }, { $inc: { avgRating: ratingDif } })
      return res.status(200).send({ updatedRating, updatedWine })
    } else {
      // create a new rating and save it
      const newRating = await Rating.create({ wineId, ...req.body })
      const updatedWine = await Wine.updateOne({ _id: wineId }, { $inc: { ratingCount: 1, avgRating: rating } })
      return res.status(201).send({ newRating, updatedWine })
    }
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getUserWineRatings = async (req, res) => {
  const { userId } = req.params
  try {
    const ratings = await Rating.find({ userId }).populate('userId', 'name').populate('wineId')
    return res.status(200).send({ ratings })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getUserRating = async (req, res) => {
  const { wineId, userId } = req.params
  try {
    const rating = await Rating.findOne({ wineId, userId }, 'rating')
    console.log(rating.rating)
    return res.status(200).send({rating: rating.rating})
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getRecentWineRatings = async (req, res) => {
  const { wineId } = req.params
  try {
    const ratings = await Rating
      .find({ wineId })
      .populate('userId', 'name avatar')
      .sort({ _id: -1 })
      .limit(10)
    return res.status(200).send({ ratings })
  } catch (error) {
    console.error(error)
    return res.send({ message: 'There was an error retrieving the recent ratings for this wine' })
  }
}