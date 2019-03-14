import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation-branches';
import * as branches from '../controllers/branch.controller';
import { catchErrors, checkAccess } from '../controllers/helper-functions';

const router = express.Router();

router.route('/')

      /** GET /api/branches - Get full list of branches */
      .get(checkAccess, catchErrors(branches.list))

      /** POST /api/branches - Create new branch */
      .post(validate(paramValidation.addBranch), checkAccess, catchErrors(branches.add));

router.route('/page')

      /** GET /api/branches/page - Get page from branches list */
      .get(validate(paramValidation.getPageBranches), checkAccess, catchErrors(branches.page));

router.route('/:id')

      /** Gimportpi/branches/:id - Get branch by id */
      .get(validate(paramValidation.getBranchById), checkAccess, catchErrors(branches.get))

      /** PUT /api/branches/:id - Update branch fields */
      .put(validate(paramValidation.updateBranch), checkAccess, catchErrors(branches.update));

export { router as branchRoutes };

