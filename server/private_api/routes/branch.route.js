const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-branches');
const branchCtrl = require('../controllers/branch.controller');
import { catchErrors } from '../controllers/helper-functions';

const router = express.Router();

router.route('/')
      /** GET /api/branches - Get full list of branches */
      .get(
        catchErrors(branchCtrl.list)
      );

router.route('/page')
      /** GET /api/branches/page - Get page from branches list */
      .get(
        validate(paramValidation.getPageBranches),
        catchErrors(branchCtrl.page)
      );

router.route('/:id')
      /** GET /api/branches/:id - Get branch by id */
      .get(
        validate(paramValidation.getBranchById),
        catchErrors(branchCtrl.get)
      )
      /** PUT /api/branches/:id - Update branch fields */
      .put(
        validate(paramValidation.updateBranch),
        catchErrors(branchCtrl.update)
      );

module.exports = router;

