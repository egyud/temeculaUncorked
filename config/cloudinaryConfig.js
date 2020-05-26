require('dotenv').config()
const cloudinary = require('cloudinary')
exports.uploader = cloudinary.uploader

exports.cloudinaryConfig = (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  })

  next()
}