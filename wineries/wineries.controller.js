const Winery = require('./winery.model')
const Wine = require('../wines/wine.model')

// add initial winery data
exports.postWinery = async (req, res) => {
  // req.body will include name, address, hours, wineClubs, hasRestaurant, hasLiveMusic
  try {
    const winery = await Winery.create({...req.body})
    console.log(req.body)
    return res.status(201).send({ winery })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// get data for individual winery
exports.getWinery = async (req, res) => {
  const { name } = req.params
  try {
    console.log('getWinery: ', name)
    const winery = await Winery.findOne({ name })
    const wines = await Wine.find({ winery: name })
    return res.status(200).send({ winery, wines })
  } catch(error) {
    return res.status(400).end()
  }
} 

// get data for wineries
exports.getWineries = async (req, res) => {
  try {
    let wineries = await Winery.find({}, 'name avgRating reviewCount')
    return res.status(200).send({ wineries })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getAllWines = async (req, res) => {
  try {
    let wines = await Winery.find({}, 'wines name')
    return res.status(200).send({ wines })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// add keywords to winery entry
exports.postKeywords = async (req, res) => {
  const { name } = req.params
  try {
    const winery = await Winery.updateOne({ name }, { $push: { keywords: req.body } })
    return res.status(200).send({ data: winery })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// add list of wines to winery entry
exports.postWines = async (req, res) => {
  const { name } = req.params
  try {
    const winery = await Winery.updateOne({ name }, { $set: { wines: req.body } })
    console.log(winery)
    console.log(name)
    return res.status(201).send({ data: winery })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// add wine club details for winery entry
exports.postWineClub = async (req, res) => {
  const { name } = req.params
  try {
    const winery = await Winery.updateOne({ name }, { $push: { wineClubs: req.body } })
    return res.status(201).send({ data: winery })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// return data for all wine clubs
exports.getWineClubs = async (req, res) => {
  try {
    console.log('req made to getWineClubs')
    let data = await Winery.find({ wineClubs: { $exists: true } }, 'name wineClubs')
    return res.status(200).send({ data })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// add live music data for winery entry
exports.postLiveMusic = async (req, res) => {
  const { name } = req.params
  try {
    const winery = await Winery.updateOne({ name }, { $set: { musicDays: req.body } })
    return res.status(201).send({ data: req.body })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// retrieve live music data
exports.getLiveMusic = async (req, res) => {
  try {
    const wineries = await Winery.find({ musicDays: { $exists: true } }, 'name musicDays')
    return res.status(200).send({ wineries })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

// add keywords to winery entry
exports.postKeywords = async (req, res) => {
  const { name } = req.params
  try {
    await Winery.updateOne({ name }, { $push: { keywords: req.body } })
    return res.status(201).send({ data: req.body })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// get data for individual wine
exports.getWine = async (req, res) => {
  const { name, wine } = req.params
  try { 
    const winery = await Winery.findOne({ name }, 'name wines')
    const wineData = winery.wines.filter(w => w.name === wine)
    return res.status(200).json({ wineData })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.postEvents = async (req, res) => {
  console.log('in post events controller')
  const wineryName = req.params.winery
  const { title, date, time } = req.body
  try {
    const winery = await Winery.findOneAndUpdate({ name: wineryName }, { $push: { events: req.body }})
    return res.status(201).send({ data: winery })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getAllEvents = async (req, res) => {
  try {
    let data = await Winery.find({ events: { $exists: true } }, 'name events' )
    return res.status(200).send({ data })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getEventsForOne = async (req, res) => {
  const { winery } = req.params
  try {
    const wineryDoc = await Winery.findOne({ name: winery }, 'name events')
    return res.status(200).send({ data: wineryDoc })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getWineRating = async (req, res) => {
  try {
    const name = req.params.name.replace(/%20/g, ' ')
    const wine = req.params.wine.replace(/%20/g, ' ') 
    const winery = await Winery.findOne({ name }, 'name wines')
    const wineData = winery.wines.filter(w => w.name === wine)

  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}