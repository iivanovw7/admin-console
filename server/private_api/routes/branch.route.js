import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation-branches';
import { catchErrors } from '../controllers/helper-functions';
import * as branches from '../controllers/branch.controller';

const router = express.Router();

router.route('/')
      /** GET /api/branches - Get full list of branches */
      .get(catchErrors(branches.list))
      /** POST /api/branches - Create new branch */
      .post(validate(paramValidation.addBranch), catchErrors(branches.add));

router.route('/page')
      /** GET /api/branches/page - Get page from branches list */
      .get(validate(paramValidation.getPageBranches), catchErrors(branches.page));

router.route('/:id')
      /** Gimportpi/branches/:id - Get branch by id */
      .get(validate(paramValidation.getBranchById), catchErrors(branches.get))
      /** PUT /api/branches/:id - Update branch fields */
      .put(validate(paramValidation.updateBranch), catchErrors(branches.update));

export { router as branchRoutes };

