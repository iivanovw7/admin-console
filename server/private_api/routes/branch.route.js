const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-branches');
const branchCtrl = require('../controllers/branch.controller');

const router = express.Router();

router.route('/')
      /** GET /api/branches - Get full list of branches */
      .get(branchCtrl.list);

router.route('/page')
      /** GET /api/branches/page - Get page from branches list */
      .get(validate(paramValidation.getPageBranches), branchCtrl.page);

router.route('/:id')
      /** GET /api/branches/:id - Get branch by id */
      .get(validate(paramValidation.getBranchById), branchCtrl.get)
      /** PUT /api/branches/:id - Update branch fields */
      .put(validate(paramValidation.updateBranch), branchCtrl.update);


module.exports = router;

