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
    }
  },
  //GET /api/branches/:id
  getBranchById: {
    params: {
      id: Joi.objectId().required()
    }
  },
  //PUT /api/branches/:id
  updateBranch: {
    params: {
      id: Joi.objectId().required()
    },
    headers: {
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phone: Joi.string().required(),
      fax: Joi.string().required(),
      address: Joi.string().required(),
      information: Joi.string().required(),
      status: Joi.bool().required()
    }
  },
  //POST /api/branches/
  addBranch: {
    headers: {
      name: Joi.string().required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phone: Joi.string().required(),
      fax: Joi.string().required(),
      address: Joi.string().required(),
      information: Joi.string().required(),
      status: Joi.bool().required()
    }
  }
};