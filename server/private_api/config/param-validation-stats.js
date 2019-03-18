import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Statistics
 *
 * */
export const getUsers = {
  headers: {
    months: Joi.number().required().min(1).max(1000),
  }
};

export const getTickets = {
  headers: {
    months: Joi.number().required().min(1).max(1000),
  }
};

