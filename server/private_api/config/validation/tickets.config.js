import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// Validation for Tickets
// PUT /api/tickets/:id
export const updateTicket = {
  params: {
    id: Joi.objectId().required()
  },
  body: {
    status: Joi.string().min(3).max(50).required(),
    note: Joi.string().max(500)
  }
};

// POST /api/tickets
export const addTicket = {
  body: {
    author: Joi.objectId().required(),
    branch: Joi.objectId(),
    status: Joi.string().min(3).max(50),
    subject: Joi.string().min(3).max(50).required(),
    message: Joi.string().min(3).max(500).required(),
    note: Joi.string().max(500)
  }
};

// GET /api/tickets/listRoles
export const getPage = {
  query: {
    page: Joi.number().min(1).max(2000),
    limit: Joi.number().min(1).max(2000)
  }
};

// GET /api/tickets/:id
export const getTicket = {
  params: {
    id: Joi.objectId().required()
  }
};

// GET /api/tickets/search
export const getPageSearch = {
  query: {
    search: Joi.string().min(3).max(50).required(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};



