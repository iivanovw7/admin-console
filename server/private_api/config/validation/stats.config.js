import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// Validation for Statistics
export const getUsers = {
  query: {
    months: Joi.number().required().min(1).max(2000)
  }
};

export const getTickets = {
  query: {
    months: Joi.number().required().min(1).max(2000)
  }
};

