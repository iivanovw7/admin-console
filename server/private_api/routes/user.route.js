import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../helper-functions';
import * as paramValidation from '../config/validation/users.config';
import * as users from '../controllers/user.controller';

const router = express.Router();

router.route('/')
      // GET /api/users - Get full list of users
      .get(checkAccess, validate(paramValidation.getPage), catchErrors(users.listUsers));

router.route('/search')
      // GET /api/users/search - Gets listRoles with search results by email, name, surname
      .get(checkAccess, validate(paramValidation.getPageSearch), catchErrors(users.searchUsers));

router.route('/:id')
      // GET /api/users/:id - Get single user
      .get(checkAccess, validate(paramValidation.getUser), catchErrors(users.getUser))
      // PUT /api/users/:id - Update user
      .put(checkAccess, validate(paramValidation.updateUser), catchErrors(users.updateUser));

router.route('/history/:id')
      // GET /api/users/history/:id - Get single users history
      .get(checkAccess, validate(paramValidation.getUserHistory), catchErrors(users.getUserHistory));

router.route('/branch/:id')
      // GET /api/users/branch/:id - Get listRoles from users list by branch
      .get(checkAccess, validate(paramValidation.getPageBranch), catchErrors(users.getUsersByBranch));

router.route('/group/:id')
      // GET /api/users/group/:id - Get listRoles from users list by group
      .get(checkAccess, validate(paramValidation.getPageGroup), catchErrors(users.getUsersByGroup));

export { router as userRoutes };


