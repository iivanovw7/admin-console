const express = require('express');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const router = express.Router();

/**
 * Contains Routes structure for private api logic
 * GET /check - testing if api is alive
 **/

/** Check if server application oi alive */
router.get('/check', (req, res) =>
  res.send('OK')
);

/** Mount user routes at /users */
router.use('/users', userRoutes);

/** Mount auth routes at /auth */
router.use('/auth', authRoutes);

module.exports = router;