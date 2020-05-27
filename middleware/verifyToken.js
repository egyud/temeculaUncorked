const jwt = require('jsonwebtoken')
const access_token_secret = require('../config/config').access_token_secret

export const auth = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access Denied')

  try {
    const verified = jwt.verify(token, access_token_secret)
    req.user = verified
    next()
  } catch(err) {
    releaseEvents.status(400).send('Invalid Token')
  }
}