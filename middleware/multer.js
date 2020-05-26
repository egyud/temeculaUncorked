const multer = require('multer')
const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  transformation: [{width: 500, height: 500, crop: 'limit'}]
})


exports.multerUploads = multer({ storage }).single('image')