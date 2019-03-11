const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-roles');
const roleCtrl = require('../controllers/role.controller');
import { catchErrors } from '../controllers/helper-functions';

const router = express.Router();

router.route('/')
      /** GET /api/roles - Get full list of roles */
      .get(
        catchErrors(roleCtrl.list)
      )
      /** POST /api/roles/ - Create role */
      .post(
        validate(paramValidation.addRole),
        catchErrors(roleCtrl.add)
      );

router.route('/page')
      /** GET /api/roles/page - Get page from roles list */
      .get(
        validate(paramValidation.getPageRoles),
        catchErrors(roleCtrl.page)
      );

router.route('/:id')
      /** GET /api/roles/:id - Get role */
      .get(
        validate(paramValidation.getRole),
        catchErrors(roleCtrl.get)
      )
      /** PUT /api/roles/:id - Update role fields */
      .put(
        validate(paramValidation.updateRole),
        catchErrors(roleCtrl.update)
      )
      /** DELETE /api/roles/:id - Delete role */
      .delete(
        validate(paramValidation.removeRole),
        catchErrors(roleCtrl.remove)
      );

module.exports = router;

