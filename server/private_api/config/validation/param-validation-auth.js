import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

//Validation for Login form
//POST /api/auth/login
export const login = {
  body: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required()
  }
};