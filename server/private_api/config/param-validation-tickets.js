import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Tickets
 *
 * */
// PUT /api/tickets/:id
export const updateTicket = {
  params: {
    id: Joi.objectId().required()
  },
  headers: {
    status: Joi.string().min(3).max(50).required(),
    note: Joi.string().max(500),
  }
};

// POST /api/tickets
export const addTicket = {
  headers: {
    status: Joi.string().min(3).max(50),
    subject: Joi.string().min(3).max(50).required(),
    message: Joi.string().min(3).max(500).required(),
    note: Joi.string().max(500)
  },
  body: {
    author: Joi.objectId().required(),
    branch: Joi.objectId()
  }
};

// GET /api/tickets/page
export const getPage = {
  params: {
  },
  headers: {
    page: Joi.number().required(),
    limit: Joi.number().required()
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
  params: {
  },
  headers: {
    search: Joi.string().min(3).max(50).required(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};

