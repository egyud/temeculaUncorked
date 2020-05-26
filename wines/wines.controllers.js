const Wine = require('./wine.model')
const average = require('../utils/average')

// get all wines from all wineries
exports.getAllWines = async (req, res) => {
  try {
    let wines = await Wine.find({}).lean()
    wines = wines.map(wine => {
      return {
        rating: average(wine.avgRating, wine.ratingCount),
        ...wine
      }
    })
    return res.status(200).send({ wines })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// get wine for a specific winery
exports.getWines = async (req, res) => {
  const { winery } = req.params
  try {
    let wines = await Wine.find({ winery }).lean()
    wines = wines.map(wine => {
      return {
        rating: average(wine.avgRating, wine.ratingCount),
        ...wine
      }
    })
    return res.status(200).send({ wines })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// get data for individual wine
exports.getWine = async (req, res) => {
  const { name, winery } = req.params
  try {
    let wine = await Wine.findOne({ name, winery })
    return res.status(200).send({ wine })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// add list of wines to winery entry
exports.postWines = async (req, res) => {
  let { winery } = req.params
  try {
    await Winery.updateOne({ name: winery }, { $set: { wines: req.body } })
    return res.status(201).send({ message: 'Wine list successfully submitted' })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.postWine = async (req, res) => {
  try {
    console.log(req.body)
    console.log('in postWine')
    const wine = await Wine.create({ ...req.body })
    // return res.status(201).redirect('http://localhost:5000/')
    return res.status(201).send({ message: 'success' })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}