const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-users');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
      /** GET /api/users - Get full list of users */
      .get(userCtrl.list);

router.route('/:id')
      /** GET /api/users/:id - Get single user */
      .get(validate(paramValidation.getUser), userCtrl.get)
      /** PUT /api/users/:id - Update user */
      .put(validate(paramValidation.updateUser), userCtrl.update)
      /** DELETE /api/users/:id - Delete user */
      .delete(validate(paramValidation.deleteUser), userCtrl.remove);

router.route('/branch/:id')
      /** GET /api/users/page/branch - Get page from users list by branch*/
      .get(validate(paramValidation.getPageBranch), userCtrl.branch);

router.route('/group/:id')
      /** GET /api/users/page/group - Get page from users list by group */
      .get(validate(paramValidation.getPageGroup), userCtrl.group);

router.route('/page')
      /** GET /api/users/page - Get page from users list */
      .get(validate(paramValidation.getPage), userCtrl.page);

router.route('/search')
      /** GET /api/users/search - Gets page with search results by email, name, surname */
      .get(validate(paramValidation.getPageSearch), userCtrl.search);

module.exports = router;

