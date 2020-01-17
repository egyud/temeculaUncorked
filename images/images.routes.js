const express = require('express')
const router = express.Router()
const multerUploads = require('../middleware/multer').multerUploads

const ImageControllers = require('./images.controllers')

// post /api/images
router.post('/', multerUploads, ImageControllers.postImage)

// get /api/images/:winery
router.get('/:winery', ImageControllers.getWineryImages)

module.exports = router