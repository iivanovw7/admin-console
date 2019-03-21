import express from 'express';
import { isLoggedIn } from './controllers/auth.controller';
import { authRoutes } from './routes/auth.route';
import { branchRoutes } from './routes/branch.route';
import { groupRoutes } from './routes/group.route';
import { roleRoutes } from './routes/role.route';
import { userRoutes } from './routes/user.route';
import { ticketRoutes } from './routes/ticket.route';
import { messageRoutes } from './routes/message.route';
import { statsRoutes } from './routes/stats.route';

const routes = express();



/** Contains Routes structure for "Private API" logic */

// Check if server application is alive
routes.get('/check', (req, res) =>
  res.send('OK')
);

/** Mount auth routes at /auth */
routes.use('/auth', authRoutes);

/** Mount users routes at /users */
routes.use('/users', isLoggedIn, userRoutes);

/** Mount role routes at /roles */
routes.use('/roles', isLoggedIn, roleRoutes);

/** Mount branches routes at /branches */
routes.use('/branches', isLoggedIn, branchRoutes);

/** Mount groups routes at /groups */
routes.use('/groups', isLoggedIn, groupRoutes);

/** Mount tickets routes at /tickets */
routes.use('/tickets', isLoggedIn, ticketRoutes);

/** Mount messages routes at /messages */
routes.use('/messages', isLoggedIn, messageRoutes);

/** Mount stats routes at /stats */
routes.use('/stats', isLoggedIn, statsRoutes);

export { routes };


