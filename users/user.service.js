const express = require('express')
const jwt = require('jsonwebtoken')
const access_token_secret = require('../config/config').access_token_secret

require('dotenv').config()

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401)
  }

  jwt.verify(token, access_token_secret, (err, user) => {
    if (err) {
      return res.status(403).send({ msg: 'Token is not valid' })
    }
    req.user = user
    console.log('req.user')
    console.log(req.user)
    next()
  })

}