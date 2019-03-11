const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Login form
 *
 * */
module.exports = {
  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};