const express = require('express')
const router = express.Router()
const multerUploads = require('../middleware/multer').multerUploads
const { userValidationRules, userRegistrationRules, validate } = require('./validator')

const UsersController = require('./users.controllers')

// post /users/register
router.post('/register', userRegistrationRules(), validate, UsersController.registerUser)

// post /users/login
router.post('/login', userValidationRules(), validate, UsersController.loginUser)

// post /users/delete
router.post('/delete', UsersController.deleteUser)

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

// post /users/block
router.post('/block', UsersController.blockUser)

module.exports = router