const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation-auth');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

/** POST /api/auth/login - Checks username and password */
router.post(
  '/login',
  validate(paramValidation.login),
  authCtrl.login
);

router.route('/logout').get(authCtrl.logout);

module.exports = router;