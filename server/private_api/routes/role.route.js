const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-roles');
const roleCtrl = require('../controllers/role.controller');

const router = express.Router();

router.route('/')
      /** GET /api/roles - Get full list of roles */
      .get(roleCtrl.list)
      /** POST /api/roles/ - Create role */
      .post(validate(paramValidation.addRole), roleCtrl.add);

router.route('/page')
      /** GET /api/roles/page - Get page from roles list */
      .get(validate(paramValidation.getPageRoles), roleCtrl.page);

router.route('/:id')
      /** GET /api/roles/:id - Get role */
      .get(validate(paramValidation.getRole), roleCtrl.get)
      /** PUT /api/roles/:id - Update role fields */
      .put(validate(paramValidation.updateRole), roleCtrl.update)
      /** DELETE /api/roles/:id - Delete role */
      .delete(validate(paramValidation.removeRole), roleCtrl.remove);

module.exports = router;

