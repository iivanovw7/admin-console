import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/validation/param-validation-roles';
import { catchErrors, checkAccess } from '../helper-functions';
import * as roles from '../controllers/role.controller';

const router = express.Router();

router.route('/')
      // GET /api/roles - Get listRoles from roles list
      .get(checkAccess, validate(paramValidation.getPageRoles), catchErrors(roles.listRoles))
      // POST /api/roles - Create role
      .post(checkAccess, validate(paramValidation.addRole), catchErrors(roles.addRole));

router.route('/:id')
      // GET /api/roles/:id - Get role
      .get(checkAccess, validate(paramValidation.getRole), catchErrors(roles.getRole))
      // PUT /api/roles/:id - Update role fields
      .put(checkAccess, validate(paramValidation.updateRole), catchErrors(roles.updateRole))
      // DELETE /api/roles/:id - Delete role
      .delete(checkAccess, validate(paramValidation.removeRole), catchErrors(roles.removeRole));

export { router as roleRoutes };

