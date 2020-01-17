const Joi = require('@hapi/joi')



// Register Validation schema
const registerValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  try {
    await schema.validateAsync(req.body)
  } catch (error) {
    return res.status(400).send({ error: error.details[0].message })
  }

  return schema.validate(data, schema)
}

const loginValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })

  return schema.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation