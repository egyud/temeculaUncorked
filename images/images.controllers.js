const Image = require('./image.model')

exports.postImage = async (req, res) => {
  const { activeUserId, caption, wineryId } = req.body
  console.log(req.file)
  try {
    const { url, public_id } = req.file
    const image = await Image.create({
      user: activeUserId,
      winery: wineryId,
      url,
      public_id,
      caption
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
    return res.status(400).end()
  }
}