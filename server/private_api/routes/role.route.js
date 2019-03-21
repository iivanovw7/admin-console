import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/validation/param-validation-roles';
import { catchErrors, checkAccess } from '../helper-functions';
import * as roles from '../controllers/role.controller';

const router = express.Router();

router.route('/')
      // GET /api/roles - Get full list of roles
      .get(checkAccess, catchErrors(roles.list))
      // POST /api/roles - Create role
      .post(checkAccess, validate(paramValidation.addRole), catchErrors(roles.add));

router.route('/page')
      // GET /api/roles/page - Get page from roles list
      .get(checkAccess, validate(paramValidation.getPageRoles), catchErrors(roles.page));

router.route('/:id')
      // GET /api/roles/:id - Get role
      .get(checkAccess, validate(paramValidation.getRole), catchErrors(roles.get))
      // PUT /api/roles/:id - Update role fields
      .put(checkAccess, validate(paramValidation.updateRole), catchErrors(roles.update))
      // DELETE /api/roles/:id - Delete role
      .delete(checkAccess, validate(paramValidation.removeRole), catchErrors(roles.remove));

export { router as roleRoutes };

