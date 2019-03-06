const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation');
const userCtrl = require('../controllers/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

      /** GET /api/users - Get list of users */
      .get(userCtrl.list);

module.exports = router;


//TODO :
// /** POST /api/users - Create new user */
// //.post(validate(paramValidation.createUser), userCtrl.create);
//
// router.route('/:userId');
// /** GET /api/users/:userId - Get user */
// //.get(userCtrl.get)
//
// /** PUT /api/users/:userId - Update user */
// //.put(validate(paramValidation.updateUser), userCtrl.update)
//
// /** DELETE /api/users/:userId - Delete user */
// //.delete(userCtrl.remove);