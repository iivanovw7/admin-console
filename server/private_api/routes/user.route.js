import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation-users';
import { catchErrors } from '../controllers/helper-functions';
import * as users from '../controllers/user.controller';

const router = express.Router();

router.route('/')
      /** GET /api/users - Get full list of users */
      .get(catchErrors(users.list));

router.route('/page')
      /** GET /api/users/page - Get page from users list */
      .get(validate(paramValidation.getPage), catchErrors(users.page));

router.route('/search')
      /** GET /api/users/search - Gets page with search results by email, name, surname */
      .get(validate(paramValidation.getPageSearch), catchErrors(users.search));

router.route('/:id')
      /** GET /api/users/:id - Get single user */
      .get(validate(paramValidation.getUser), catchErrors(users.get))
      /** PUT /api/users/:id - Update user */
      .put(validate(paramValidation.updateUser), catchErrors(users.update))
      /** DELETE /api/users/:id - Delete user */
      .delete(validate(paramValidation.deleteUser), catchErrors(users.remove));

router.route('/branch/:id')
      /** GET /api/users/page/branch - Get page from users list by branch*/
      .get(validate(paramValidation.getPageBranch), catchErrors(users.branch));

router.route('/group/:id')
      /** GET /api/users/page/group - Get page from users list by group */
      .get(validate(paramValidation.getPageGroup), catchErrors(users.group));

export { router as userRoutes };


