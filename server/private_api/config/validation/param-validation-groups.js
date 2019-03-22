import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// Validation for Groups
//GET /api/groups/listRoles
export const getPageGroups = {
  headers: {
    page: Joi.number().min(1).max(2000),
    limit: Joi.number().min(1).max(2000)
  }
};
//POST /api/groups/
export const addGroup = {
  body: {
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(500).required(),
    status: Joi.bool().required(),
    permissions: Joi.bool().required()
  }
};
//PUT /api/groups/
export const updateGroup = {
  params: {
    id: Joi.objectId().required()
  },
  body: {
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(500).required(),
    status: Joi.bool().required(),
    permissions: Joi.bool().required()
  }
};
// DELETE /api/groups/:id
export const removeGroup = {
  params: {
    id: Joi.objectId().required()
  }
};
//GET /api/groups/:id
export const getGroup = {
  params: {
    id: Joi.objectId().required()
  }
};




