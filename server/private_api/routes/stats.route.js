import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../helper-functions';
import * as paramValidation from '../config/validation/stats.config';
import * as stats from '../controllers/stats.controller';

const router = express.Router();

router.route('/');

router.route('/users')
      // GET /api/stats/users - Get users stats
      .get(checkAccess, validate(paramValidation.getUsers), catchErrors(stats.usersStats));

router.route('/permissions')
      // GET /api/stats/permissions - Get permissions stats
      .get(checkAccess, catchErrors(stats.permissionsStats));

router.route('/tickets')
      // GET /api/stats/tickets - Get tickets stats
      .get(checkAccess, validate(paramValidation.getTickets), catchErrors(stats.ticketsStats));

router.route('/groups')
      // GET /api/stats/groups - Get groups stats
      .get(checkAccess, catchErrors(stats.groupsStats));

router.route('/messages')
      // GET /api/stats/messages - Get messages stats
      .get(checkAccess, validate(paramValidation.getUsers), catchErrors(stats.messagesStats));

router.route('/branch')
      //GET //api/stats/branch - Get branch users quantity
      .get(checkAccess, validate(paramValidation.getBranch), catchErrors(stats.branchStats));


export { router as statsRoutes };


