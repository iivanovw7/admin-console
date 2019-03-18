import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Users
 *
 * */
// POST /api/users
export const createUser = {
  body: {
    username: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  }
};

// GET /api/users/:id
export const getUser = {
  params: {
    id: Joi.objectId().required()
  }
};

// GET /api/users/history/:id
export const getUserHistory = {
  params: {
    id: Joi.objectId().required()
  },
  headers: {
    months: Joi.number().required().min(1).max(1000),
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};

// PUT /api/users/:id
export const updateUser = {
  params: {
    id: Joi.objectId().required()
  },
  headers: {
    group: Joi.objectId().required().min(3).max(50),
    branch: Joi.objectId().required().min(3).max(50),
    role: Joi.objectId().required().min(3).max(50),
    status: Joi.boolean().required()
  }
};

// GET /api/users/page
export const getPage = {
  headers: {
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};

// GET /api/users/branch/:id
export const getPageBranch = {
  params: {
    id: Joi.objectId().required()
  },
  headers: {
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};


// GET /api/users/group/:id
export const getPageGroup = {
  params: {
    id: Joi.objectId().required(),
  },
  headers: {
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }
};


// GET /api/users/search
export const getPageSearch = {
  headers: {
    search: Joi.string().min(3).max(50).required(),
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }
};

