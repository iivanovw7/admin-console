import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../controllers/helper-functions';
import * as paramValidation from '../config/param-validation-users';
import * as users from '../controllers/user.controller';

const router = express.Router();

router.route('/')

      /** GET /api/users - Get full list of users */
      //TODO .get(checkAccess, catchErrors(users.list));
      .get(catchErrors(users.list));

router.route('/page')

      /** GET /api/users/page - Get page from users list */
      .get(validate(paramValidation.getPage),checkAccess, catchErrors(users.page));

router.route('/search')

      /** GET /api/users/search - Gets page with search results by email, name, surname */
      .get(validate(paramValidation.getPageSearch), catchErrors(users.search));

router.route('/:id')

      /** GET /api/users/:id - Get single user */
      .get(validate(paramValidation.getUser),checkAccess, catchErrors(users.get))

      /** PUT /api/users/:id - Update user */
      .put(validate(paramValidation.updateUser),checkAccess, catchErrors(users.update));

router.route('/history/:id')

      /** GET /api/users/history/:id - Get single users history */
      .get(validate(paramValidation.getUserHistory), checkAccess, catchErrors(users.history));

router.route('/branch/:id')

      /** GET /api/users/page/branch - Get page from users list by branch*/
      .get(validate(paramValidation.getPageBranch),checkAccess, catchErrors(users.branch));

router.route('/group/:id')

      /** GET /api/users/page/group - Get page from users list by group */
      .get(validate(paramValidation.getPageGroup),checkAccess, catchErrors(users.group));

export { router as userRoutes };


