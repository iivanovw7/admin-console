import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/validation/param-validation-branches';
import * as branches from '../controllers/branch.controller';
import { catchErrors, checkAccess } from '../helper-functions';

const router = express.Router();

router.route('/')
      // GET /api/branches/listRoles - Get listRoles from branches list
      .get(checkAccess, validate(paramValidation.getPageBranches), catchErrors(branches.listBranches))
      // POST /api/branches - Create new branch
      .post(checkAccess, validate(paramValidation.addBranch), catchErrors(branches.addBranch));

router.route('/:id')
      // GET /api/branches/:id - Get branch by id
      .get(checkAccess, validate(paramValidation.getBranchById), catchErrors(branches.getBranch))
      // PUT /api/branches/:id - Update branch fields
      .put(checkAccess, validate(paramValidation.updateBranch), catchErrors(branches.updateBranch));

export { router as branchRoutes };

