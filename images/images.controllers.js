const Image = require('./image.model')

exports.postImage = async (req, res) => {
  const { activeUserId, wineryId, url } = req.body
  try {
    const image = await Image.create({
      user: activeUserId,
      winery: wineryId,
      url,
    })
    return res.status(200).send({ image, message: 'Image successfully submitted' })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.getWineryImages = async (req, res) => {
  const { winery } = req.params
  try {
    let images = await Image
      .find({ winery })
      .populate('user', 'name')
    return res.status(200).send({ images })
  } catch (error) {
    return res.send({ message: 'Error in retrieving the images' })
  }
}