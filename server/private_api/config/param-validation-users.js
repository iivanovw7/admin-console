const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Validation for Users
 *
 * */
module.exports = {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  // GET /api/users/:id
  getUser: {
    params: {
      id: Joi.objectId().required()
    }
  },
  // DELETE /api/users/:id
  deleteUser: {
    params: {
      id: Joi.objectId().required()
    }
  },
  // PUT /api/users/:id
  updateUser: {
    params: {
      id: Joi.objectId().required()
    },
    headers: {
      group: Joi.string(),
      branch: Joi.string(),
      role: Joi.objectId(),
      status: Joi.string()
    }
  },
  // GET /api/users/page
  getPage: {
    headers: {
      page: Joi.number().required(),
      limit: Joi.number().required()
    }
  },
  // GET /api/users/branch/:id
  getPageBranch: {
    params: {
      id: Joi.objectId().required()
    },
    headers: {
      page: Joi.number().required(),
      limit: Joi.number().required()
    }
  },
  // GET /api/users/group/:id
  getPageGroup: {
    params: {
      id: Joi.objectId().required()
    },
    headers: {
      page: Joi.number().required(),
      limit: Joi.number().required()
    }
  },
  // GET /api/users/search
  getPageSearch: {
    headers: {
      search: Joi.string().required(),
      page: Joi.number().required(),
      limit: Joi.number().required()
    }
  }
};