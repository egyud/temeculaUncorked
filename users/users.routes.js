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

// // post /users/authenticate
// router.post('/authenticate', UsersController.authenticate)

// // get /users/
// router.get('/', UsersController.getAll)

// // get /users/current
// router.get('/current', UsersController.getCurrent)

// // get /users/:id
// router.get('/:id', UsersController.getById)

// // put /users/:id
// router.put('/:id', UsersController.update)

// // delete /users/:id
// router.delete('/:id', UsersController._delete)

module.exports = router