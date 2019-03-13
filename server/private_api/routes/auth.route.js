import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/param-validation-auth';
import * as auth from '../controllers/auth.controller';

const router = express.Router();

/** POST /api/auth/login - Checks username and password */
router.post('/login', validate(paramValidation.login), auth.login);

router.route('/logout').get(auth.logout);

export { router as authRoutes };