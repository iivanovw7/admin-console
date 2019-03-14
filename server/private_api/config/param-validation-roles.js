import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Roles
 *
 * */

module.exports = {
  // GET /api/roles/:id
  getRole: {
    params: {
      id: Joi.objectId().required()
    }
  },
  //GET /api/roles/page
  getPageRoles: {
    headers: {
      page: Joi.number().required(),
      limit: Joi.number().required()
    }
  },
  // DELETE /api/roles/:id
  removeRole: {
    params: {
      id: Joi.objectId().required()
    }
  },
  // PUT /api/roles/:id
  updateRole: {
    params: {
      id: Joi.objectId().required()
    },
    headers: {
      description: Joi.string().min(3).max(500).required(),
      active: Joi.bool().required(),
      public: Joi.bool().required(),
      editable: Joi.bool().required()
    }
  },
  // POST /api/roles/
  addRole: {
    headers: {
      name: Joi.string().min(3).max(50).required(),
      code: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(500).required(),
      active: Joi.bool().required(),
      public: Joi.bool(),
      editable: Joi.bool()
    }
  }
};