import express from 'express';
import { authRoutes } from './routes/auth.route';
import { branchRoutes } from './routes/branch.route';
import { groupRoutes } from './routes/group.route';
import { roleRoutes } from './routes/role.route';
import { userRoutes } from './routes/user.route';
import { ticketRoutes } from  './routes/ticket.route';
import { messageRoutes } from  './routes/message.route';

const router = express.Router();

/**
 * Contains Routes structure for "Private API" logic
 **/

/** Check if server application is alive */
router.get('/check', (req, res) =>
  res.send('OK')
);

/**
 * Mount user routes at "/users"
 * Blocks unauthorised access to users, roles,
 * branches, groups, tickets, messages and statistics
 * removed for development
 *
 * TODO //router.use('/users', isLoggedIn, userRoutes);
 * TODO //router.use('/roles', isLoggedIn, roleRoutes);
 * TODO //router.use('/branches', isLoggedIn, branchRoutes);
 * TODO //router.use('/groups', isLoggedIn, groupsRoutes);
 * TODO //router.use('/tickets', isLoggedIn, ticketsRoutes);
 * TODO //router.use('/messages', isLoggedIn, messagesRoutes);
 * TODO //router.use('/statistics', isLoggedIn, statisticsRoutes);
 *
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

/** Mount groups routes at /groups */
router.use('/groups', groupRoutes);

/** Mount tickets routes at /tickets */
router.use('/tickets', ticketRoutes);

/** Mount messages routes at /messages */
router.use('/messages', messageRoutes);

export { router as routes };