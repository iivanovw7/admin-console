import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/validation/auth.config';
import * as auth from '../controllers/auth.controller';
import { catchErrors } from '../helper-functions';

const router = express.Router();

// POST /api/auth/login - Checks username and password
router.post('/login', validate(paramValidation.login), catchErrors(auth.login));
// GET /api/auth/logout - Logout function
router.get('/logout', catchErrors(auth.logout));

export { router as authRoutes };