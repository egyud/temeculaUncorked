const express = require('express')
const router = express.Router()
const multerUploads = require('../middleware/multer').multerUploads

const UsersController = require('./users.controllers')

// post /users/register
router.post('/register', UsersController.registerUser)

// post /users/login
router.post('/login', UsersController.loginUser)

// get /users/:userId
router.get('/:userId', UsersController.getUserInfo)

// post /users/follow
router.post('/follow', UsersController.followUser)

// post /users/avatar
router.post('/avatar', multerUploads, UsersController.postAvatar)

// post /users/addMembership
router.post('/addMembership', UsersController.postAddToMembership)

// post /users/update-email
router.post('/update-email', UsersController.updateEmail)

// post /users/update-password
router.post('/update-password', UsersController.updatePassword)

// post /users/bio
router.post('/bio', UsersController.postBio)

// post /users/link
router.post('/link', UsersController.postLink)

module.exports = router