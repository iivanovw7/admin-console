const express = require('express');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const roleRoutes = require('./routes/role.route');
const branchRoutes = require('./routes/branch.route');
const router = express.Router();
const pass = require('./controllers/auth.passport.js');

/**
 * Contains Routes structure for "Private API" logic
 **/

/** Check if server application is alive */
router.get('/check', (req, res) =>
  res.send('OK')
);

/**
 * Mount user routes at "/users"
 * Blocks unauthorised access to users and roles
 * removed for development
 * TODO //router.use('/users', pass.isLoggedIn, userRoutes);
 * TODO //router.use('/roles', pass.isLoggedIn, roleRoutes);
 * TODO //router.use('/branches', pass.isLoggedIn, branchRoutes);
 *
 */

/** Mount auth routes at /auth */
router.use('/auth', authRoutes);

/** Mount users routes at /users */
router.use('/users', userRoutes);

/** Mount role routes at /roles */
router.use('/roles', roleRoutes);

/** Mount branches routes at /branches */
router.use('/branches', branchRoutes);

module.exports = router;