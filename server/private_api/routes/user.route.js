const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-users');
const userCtrl = require('../controllers/user.controller');
import { catchErrors } from '../controllers/helper-functions';

const router = express.Router();

router.route('/')
      /** GET /api/users - Get full list of users */
      .get(
        catchErrors(userCtrl.list)
      );

router.route('/page')
      /** GET /api/users/page - Get page from users list */
      .get(
        validate(paramValidation.getPage),
        catchErrors(userCtrl.page)
      );

router.route('/search')
      /** GET /api/users/search - Gets page with search results by email, name, surname */
      .get(
        validate(paramValidation.getPageSearch),
        catchErrors(userCtrl.search)
      );

router.route('/:id')
      /** GET /api/users/:id - Get single user */
      .get(
        validate(paramValidation.getUser),
        catchErrors(userCtrl.get))
      /** PUT /api/users/:id - Update user */
      .put(
        validate(paramValidation.updateUser),
        catchErrors(userCtrl.update))
      /** DELETE /api/users/:id - Delete user */
      .delete(
        validate(paramValidation.deleteUser),
        catchErrors(userCtrl.remove));

router.route('/branch/:id')
      /** GET /api/users/page/branch - Get page from users list by branch*/
      .get(
        validate(paramValidation.getPageBranch),
        catchErrors(userCtrl.branch));

router.route('/group/:id')
      /** GET /api/users/page/group - Get page from users list by group */
      .get(
        validate(paramValidation.getPageGroup),
        catchErrors(userCtrl.group));


module.exports = router;

