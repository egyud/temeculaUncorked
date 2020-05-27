const User = require('./user.model')
const Review = require('../reviews/review.model')
const Comment = require('../comments/comment.model')
const Rating = require('../ratings/rating.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const access_token_secret = require('../config/config').access_token_secret

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
      const accessToken = jwt.sign({ id: user._id }, access_token_secret, {
        expiresIn: 31556926
      })
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        memberOf: user.memberOf,
        following: user.following,
        blockedUsers: user.blockedUsers
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

// delete user and all reviews/comments posted by user from database
exports.deleteUser = async (req, res) => {
  const { id } = req.body
  try {
    await User.deleteOne({ _id: id })
    await Review.deleteMany({ userId: id })
    await Comment.deleteMany({ userId: id })
    await Rating.deleteMany({ userId: id })
    return res.send({ message: 'User successfully deleted' })
  } catch (error) {
    console.error(error)
    return res.send({ message: 'There was an error deleting the user' })
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
    // make sure that the user isn't trying to follow themself
    if (userIdToFollow !== activeUser._id ) {
      let updatedUser = await User.updateOne({ _id: activeUser._id }, { $addToSet: { following: userIdToFollow } })
      return res.status(200).send({ 
        updatedUser,
        message: `Success! You are now following this user`
      })
    }
    return res.send({ message: 'You cannot follow yourself' })
  } catch(error) {
    console.error(error)
    res.status(400).send({ message: 'There was an error submitting your follow request.' })
  }
}

exports.postAvatar = async (req, res) => {
  const { activeUserId, url } = req.body
  try {
    const user = await User.updateOne({ _id: activeUserId }, {
       $set: { avatar: { url } } 
    })
    return res.status(200).send({ user, message: 'Avatar successfully changed' })
  } catch (error) {
    console.error(error)
  }
}

exports.postAddToMembership = async (req, res) => {
  const { wineryId, userId } = req.body
  try {
    const user = await User.updateOne({ _id: userId }, { $addToSet: { memberOf: wineryId } })
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

exports.blockUser = async (req, res) => {
  const { activeUserId, userToBlockId } = req.body
  try {
    await User.updateOne({ _id: activeUserId }, { $addToSet: { blockedUsers: userToBlockId } })
    return res.send({ message: 'User was successfully blocked' })
  } catch (error) {
    console.error(error)
    return res.send({ message: 'There was an error with blocking the user' })
  }
}