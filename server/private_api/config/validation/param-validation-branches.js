import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// Validation for Branches
//GET /api/branches/listRoles
export const getPageBranches = {
  headers: {
    page: Joi.number().min(1).max(2000),
    limit: Joi.number().min(1).max(2000)
  }
};
//GET /api/branches/:id
export const getBranchById = {
  params: {
    id: Joi.objectId().required()
  }
};
//PUT /api/branches/:id
export const updateBranch = {
  params: {
    id: Joi.objectId().required()
  },
  body: {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phone: Joi.string().required(),
    fax: Joi.string().required(),
    address: Joi.string().required(),
    information: Joi.string().required(),
    status: Joi.bool().required()
  }
};
//POST /api/branches/
export const addBranch = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phone: Joi.string().required(),
    fax: Joi.string().required(),
    address: Joi.string().required(),
    information: Joi.string().required(),
    status: Joi.bool().required()
  }
};

