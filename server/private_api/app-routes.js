const express = require('express');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
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
 * Blocks unauthorised access to users
 * removed for development
 * TODO //router.use('/users', pass.isLoggedIn, userRoutes);
 */

router.use('/users', userRoutes);

/** Mount auth routes at /auth */
router.use('/auth', authRoutes);

module.exports = router;