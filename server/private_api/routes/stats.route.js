import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../controllers/helper-functions';
import * as paramValidation from '../config/param-validation-stats';
import * as stats from '../controllers/stats.controller';

const router = express.Router();

router.route('/');

// /** GET /api/tickets - Get full list of tickets */
// .get(checkAccess, catchErrors(tickets.list))
//
// /** POST /api/tickets - Create new ticket */
// .post(validate(paramValidation.addTicket), checkAccess, catchErrors(tickets.add));

router.route('/users')

      /** GET /api/stats/users - Get users stats */
      .get(validate(paramValidation.getUsers), checkAccess, catchErrors(stats.users));

router.route('/permissions')

      /** GET /api/stats/permissions - Get permissions stats */
      .get(checkAccess, catchErrors(stats.permissions));

router.route('/tickets')

      /** GET /api/stats/tickets - Get tickets stats */
      .get(validate(paramValidation.getTickets), checkAccess, catchErrors(stats.tickets));

router.route('/groups')

      /** GET /api/stats/groups - Get groups stats */
      .get(checkAccess, catchErrors(stats.groups));

router.route('/messages')

      /** GET /api/stats/messages - Get messages stats */
      .get(validate(paramValidation.getUsers), checkAccess, catchErrors(stats.messages));

router.route('/search');

// /** GET /api/tickets/search - Gets page with search results by title, name, surname */
// .get(validate(paramValidation.getPageSearch), checkAccess, catchErrors(tickets.search));

router.route('/:id');

// /** GET /api/tickets/:id - Get single ticket by id */
// .get(validate(paramValidation.getTicket), checkAccess, catchErrors(tickets.get))
//
// /** PUT /api/tickets/:id - Update ticket by id*/
// .put(validate(paramValidation.updateTicket), checkAccess, catchErrors(tickets.update));


export { router as statsRoutes };


