const Image = require('./image.model')

exports.postImage = async (req, res) => {
  // console.log(req.body)
  const { activeUserId, wineryId, url } = req.body
  // console.log(req.file)
  try {
    // const { url } = req.file
    const image = await Image.create({
      user: activeUserId,
      winery: wineryId,
      url,
      // public_id
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
    console.error(error)
    return res.status(400).send({ message: 'Error in retrieving the images' })
  }
}