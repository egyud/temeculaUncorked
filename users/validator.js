const {  check, body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ]
}

const userRegistrationRules = () => {
  return [
    // username must be between 3 to 20 characters and be only letters
    body('name').isLength({ min: 3, max: 20 }).matches(/[a-zA-Z ]/g),
    body('email').isEmail(),
    // password must include at least 1 letter, 1 number and be at least 6 characters
    body('password').matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).isLength({ min: 6 }),
    body('password2').matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).isLength({ min: 6 })
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }
  
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).send({ errors: extractedErrors })
}

module.exports = {
  userValidationRules,
  userRegistrationRules,
  validate
}