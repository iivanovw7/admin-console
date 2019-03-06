const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../config/param-validation');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

/** POST /api/auth/login - Checks username and password */
router.route('/login')
      .post(validate(paramValidation.login), authCtrl.login);

module.exports = router;