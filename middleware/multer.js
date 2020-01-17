const multer = require('multer')
const Datauri = require('datauri')
const path = require('path')
// const storage = multer.memoryStorage()
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

// const dUri = new Datauri()

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  transformation: [{width: 500, height: 500, crop: 'limit'}]
})


exports.multerUploads = multer({ storage }).single('image')

// exports.dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)