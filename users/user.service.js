const express = require('express')
const jwt = require('jsonwebtoken')

require('dotenv').config()

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