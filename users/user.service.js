const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('./user.model')

require('dotenv').config()

// exports.authenticate = async (username, password) => {
//   const user = { name: username }
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//   res.header('auth-token', accessToken).send(token)
// }

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ msg: 'Token is not valid' })
    }
    req.user = user
    console.log('req.user')
    console.log(req.user)
    next()
  })

}