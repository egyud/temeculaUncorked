const User = require('./user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dataUri = require('../middleware/multer').dataUri
const uploader = require('../config/cloudinaryConfig').uploader

require('dotenv').config()


// register user
exports.registerUser = async (req, res, next) => {
  const { name, email, password, password2 } = req.body
  try {
  
    if (password !== password2) {
      return res.status(400).send({message: 'Your passwords must match'})
    }
  
    User.findOne({ email })
      .then(user => {
        if(user) {
          res.status(400).send({ message: 'Error, Email is already in use' })
        } else {
          const newUser = new User({
            name,
            email,
            password
          })
  
          console.log(newUser)
  
          // hash password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              // set password to hash
              newUser.password = hash
              // save user
              newUser.save()
                .then(user => {
                  res.status(200).json({ data: user })
                  // redirect to login form
                })
                .catch(err => {
                  console.error(err)
                  return res.send({ messasge: 'There was an error saving user to database' })
                })
            })
          })      
        }
      })
  } catch (err) {
    console.error(err)
    return res.send({ message: 'There was an error with your registration' })
  }
}

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body
  console.log(email)
  console.log(password)

  const user = await User.findOne({ email })
    .populate('memberOf', 'name')
    .populate('following', 'name avatar')
  if (!user) {
    return res.status(400).send({message: 'Cannot find user'})
  } 

  try {
    // check if the entered password matches with the hashed password from database
    if(await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 31556926
      })
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        memberOf: user.memberOf,
        following: user.following
      }
      return res.status(200).send({
        success: true,
        token: `Bearer ${accessToken}`,
        user: data
      })
    } else {
      res.status(400).send({message: 'The password you entered was incorrect'})
    }
  } catch(error) {
    res.status(500).send({ message: 'There was an error logging in.  Please check your email and password.' })
  }

}

exports.getUserInfo = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User
      .findOne({_id: userId})
      .populate('memberOf', 'name')
      .populate('following', 'name avatar')
    return res.status(200).send({ user })
  } catch(error) {
    console.error(error)
    res.status(404).send({ error })
  }
}

exports.followUser = async (req, res) => {
  const { userIdToFollow, activeUser } = req.body
  // if the user isn't logged in, don't allow them to follow a user
  if (!activeUser._id) return res.send({ message: 'You must be logged in to do this' })
  try {
    console.log(activeUser)
    // check to see if user is already following, and make sure that the user isn't trying to follow themself
    if (!activeUser.following.includes(userIdToFollow) && userIdToFollow !== activeUser._id ) {
      let updatedUser = await User.updateOne({ _id: activeUser._id }, { $push: { following: userIdToFollow } })
      return res.status(200).send({ updatedUser })
    }
    return res.send({ message: 'You already follow this user' })
  } catch(error) {
    console.error(error)
    res.status(400).end()
  }
}

exports.postAvatar = async (req, res) => {
  const { activeUserId } = req.body
  console.log(activeUserId)
  console.log(req.file)
  try {
    const { url, public_id } = req.file
    const user = await User.updateOne({ _id: activeUserId }, {
       $set: { avatar: { url, public_id } } 
    })
    return res.status(200).send({ user, message: 'Avatar successfully changed' })
  } catch (error) {
    console.error(error)
  }
}

exports.postAddToMembership = async (req, res) => {
  const { wineryId, userId } = req.body
  try {
    const user = await User.updateOne({ _id: userId }, { $push: { memberOf: wineryId } })
    return res.status(200).send({user})
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.updateEmail = async (req, res) => {
  const { newEmail, userId } = req.body
  try {
    const user = await User.updateOne({ _id: userId }, { $set: { email: newEmail } })
    return res.status(200).send({ user })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.updatePassword = async (req, res) => {
  const { newPassword, userId } = req.body
  try {
    let user = await User.findById(userId)
    // hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err
        // set password to hash
        user.password = hash
        // save user
        user.save()
          .then(user => {
            res.status(200).send({ data: user })
          })
          .catch(err => console.error(err))
      })
    })
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}

exports.postLink = async (req, res) => {
  const { userId, link } = req.body
  try {
    const user = await User.updateOne({ _id: userId }, { $set: { link } })
    return res.send({ user })
  } catch (error) {
    console.error(error)
    return res.send({ message: 'Error updating your link' })
  }
}

exports.postBio = async (req, res) => {
  const { userId, bio } = req.body
  try {
    const user = await User.updateOne({ _id: userId }, { $set: { bio } })
    return res.send({ user })
  } catch (error) {
    console.error(error)
    return res.send({ message: 'Error updating your bio' })
  }
}