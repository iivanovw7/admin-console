const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Groups
 *
 * */

module.exports = {
  //GET /api/groups/page
  getPageGroups: {
    headers: {
      page: Joi.number().required(),
      limit: Joi.number().required()
    }
  },
  //POST /api/groups/
  addGroup: {
    headers: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.bool().required(),
      permissions: Joi.bool().required()
    }
  },
  //PUT /api/groups/
  updateGroup: {
    params: {
      id: Joi.objectId().required()
    },
    headers: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.bool().required(),
      permissions: Joi.bool().required()
    }
  },
  // DELETE /api/groups/:id
  removeGroup: {
    params: {
      id: Joi.objectId().required()
    }
  },
  //GET /api/groups/:id
  getGroup: {
    params: {
      id: Joi.objectId().required()
    }
  }
};