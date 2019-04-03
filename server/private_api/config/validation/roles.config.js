import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);


// Validation for Roles
// GET /api/roles/:id
export const getRole = {
  params: {
    id: Joi.objectId().required()
  }
};
//GET /api/roles/listRoles
export const getPageRoles = {
  query: {
    page: Joi.number(),
    limit: Joi.number()
  }
};
// DELETE /api/roles/:id
export const removeRole = {
  params: {
    id: Joi.objectId().required()
  }
};
// PUT /api/roles/:id
export const updateRole = {
  params: {
    id: Joi.objectId().required()
  },
  body: {
    description: Joi.string().min(3).max(500).required(),
    active: Joi.bool().required(),
    public: Joi.bool().required(),
    editable: Joi.bool().required()
  }
};
// POST /api/roles/
export const addRole = {
  body: {
    name: Joi.string().min(3).max(50).required(),
    code: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(500).required(),
    active: Joi.bool().required(),
    public: Joi.bool(),
    editable: Joi.bool()
  }
};




