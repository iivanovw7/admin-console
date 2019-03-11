const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Branches
 *
 * */
module.exports = {
  //GET /api/branches/page
  getPageBranches: {
    headers: {
      page: Joi.number().required(),
      limit: Joi.number().required()
    },
  },
  //GET /api/branches/:id
  getBranchById: {
    params: {
      id: Joi.objectId().required(),
    }
  },
  //PUT /api/branches/:id
  updateBranch: {
    params: {
      id: Joi.objectId().required(),
    },
    headers: {
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      fax: Joi.string(),
      address: Joi.string(),
      information: Joi.string(),
      active: Joi.bool()
    }
  }
};