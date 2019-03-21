import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../helper-functions';
import * as paramValidation from '../config/validation/param-validation-tickets';
import * as tickets from '../controllers/ticket.controller';

const router = express.Router();

router.route('/')
      // GET /api/tickets - Get full list of tickets
      .get(checkAccess, validate(paramValidation.getPage), catchErrors(tickets.listTickets))
      // POST /api/tickets - Create new ticket
      .post(checkAccess, validate(paramValidation.addTicket), catchErrors(tickets.addTicket));

router.route('/search')
      // GET /api/tickets/search - Gets page with search results by title, name, surname
      .get(checkAccess, validate(paramValidation.getPageSearch), catchErrors(tickets.searchTicket));

router.route('/:id')
      // GET /api/tickets/:id - Get single ticket by id
      .get(checkAccess, validate(paramValidation.getTicket), catchErrors(tickets.getTicket))
      // PUT /api/tickets/:id - Update ticket by id
      .put(checkAccess, validate(paramValidation.updateTicket), catchErrors(tickets.updateTicket));


export { router as ticketRoutes };


