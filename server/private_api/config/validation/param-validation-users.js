import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// Validation for Users
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
  body: {
    group: Joi.objectId().required().min(3).max(50),
    branch: Joi.objectId().required().min(3).max(50),
    role: Joi.objectId().required().min(3).max(50),
    status: Joi.boolean().required()
  }
};

// GET /api/users/listRoles
export const getPage = {
  headers: {
    page: Joi.number().min(1).max(2000),
    limit: Joi.number().min(1).max(2000)
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
    id: Joi.objectId().required()
  },
  headers: {
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};


// GET /api/users/search
export const getPageSearch = {
  headers: {
    search: Joi.string().min(3).max(50).required(),
    page: Joi.number().required(),
    limit: Joi.number().required()
  }
};

