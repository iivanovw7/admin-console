import express from 'express';
import validate from 'express-validation';
import { catchErrors } from '../controllers/helper-functions';
import * as paramValidation from '../config/param-validation-tickets';
import * as tickets from '../controllers/ticket.controller';

const router = express.Router();

router.route('/')
      /** GET /api/tickets - Get full list of tickets */
      .get(catchErrors(tickets.list))
      /** POST /api/tickets - Create new ticket */
      .post(validate(paramValidation.addTicket), catchErrors(tickets.add));

router.route('/page')
      /** GET /api/tickets/page - Get page from tickets list */
      .get(validate(paramValidation.getPage), catchErrors(tickets.page));

router.route('/search')
      /** GET /api/tickets/search - Gets page with search results by title, name, surname */
      .get(validate(paramValidation.getPageSearch), catchErrors(tickets.search));

router.route('/:id')
      /** GET /api/tickets/:id - Get single ticket by id */
      .get(validate(paramValidation.getTicket), catchErrors(tickets.get))
      /** PUT /api/tickets/:id - Update ticket by id*/
      .put(validate(paramValidation.updateTicket), catchErrors(tickets.update));


export { router as ticketRoutes };


