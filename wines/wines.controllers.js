const Wine = require('./wine.model')

// get all wines from all wineries
exports.getAllWines = async (req, res) => {
  try {
    let wines = await Wine.find({})
    return res.status(200).send({ wines })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}

// get wine for a specific winery
exports.getWines = async (req, res) => {
  const { winery } = req.body
  try {
    let wines = await Wine.find({ winery })
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
  // name will be the name of the winery, replacing the plus signs in the query string with spaces
  let name = req.params.name.replace(/\+/g, ' ')
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

exports.postWine = async (req, res) => {
  const { winery } = req.params
  // req.body will include name, price, clubPrice
  try {
    const wine = await Wine.create({
      winery,
      ...req.body
    })
    return res.status(201).send({ wine })
  } catch(error) {
    console.error(error)
    return res.status(400).end()
  }
}