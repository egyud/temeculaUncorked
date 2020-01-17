const User = require('./user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation')
const dataUri = require('../middleware/multer').dataUri
const uploader = require('../config/cloudinaryConfig').uploader

require('dotenv').config()


// register user
exports.registerUser = async (req, res, next) => {
  const { name, email, password, password2 } = req.body
  try {

    // validate data
    const { error } = registerValidation(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    console.log('in registerUser')
  
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
                .catch(err => console.error(err))
            })
          })      
        }
      })
  } catch (err) {
    console.error(err)
  }
}

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body

  // const { error } = loginValidation(req.body)
  // const valid = error == null
  // if(!valid) {
  //   return res.status(400).send(error.details[0].message)
  // }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).send('Cannot find user')
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
        avatar: user.avatar
      }
      return res.status(200).send({
        success: true,
        token: `Bearer ${accessToken}`,
        user: data
      })
    } else {
      res.status(400).send('Passwords do not match')
    }
  } catch {
    res.status(500).send()
  }

}

exports.getUserInfo = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User
      .findOne({_id: userId})
      .populate('memberOf', 'name')
    return res.status(200).send({ user })
  } catch(error) {
    console.error(error)
    res.status(404).end()
  }
}

exports.followUser = async (req, res) => {
  const { userIdToFollow, activeUser } = req.body
  // if the user isn't logged in, don't allow them to follow a user
  if (!activeUser.id) return res.send({ message: 'You must be logged in to do this' })
  try {
    console.log(activeUser)
    let followedUser = await User.findOne({ _id: userIdToFollow })
    console.log(followedUser)
    // check to see if user is already following, and make sure that the user isn't trying to follow themself
    if (!followedUser.followers.includes(activeUser.id) && userIdToFollow !== activeUser.id ) {
      followedUser = await User.updateOne({ _id: userIdToFollow }, { $push: { followers: activeUser.id } })
      return res.status(200).send({ followedUser })
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