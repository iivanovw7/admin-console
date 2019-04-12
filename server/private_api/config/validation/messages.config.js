import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// Validation for Messages
// GET /api/messages/listRoles
export const getPage = {
  query: {
    page: Joi.number().min(1).max(2000),
    limit: Joi.number().min(1).max(2000)
  }
};

// GET /api/messages/:id
export const getMessage = {
  params: {
    id: Joi.objectId().required()
  }
};

// GET /api/messages/group/:id
export const getPageById = {
  params: {
    id: Joi.objectId().required()
  },
  query: {
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};

// POST /api/messages/new
export const sendMessage = {
  body: {
    branchId: Joi.objectId(),
    groupId: Joi.objectId(),
    subject: Joi.string().min(3).max(50).required(),
    message: Joi.string().min(3).max(500).required()
  }
};

// GET /api/messages/search
export const pageSearch = {
  query: {
    search: Joi.string().min(3).max(50).required(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};