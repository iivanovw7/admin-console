import httpStatus from 'http-status';
import Ticket from '../../models/Ticket';
import User from '../../models/User';
import Branch from '../../models/Branch';
import { defaultStatuses } from '../config/param-controllers';
import { ifArrayContains, getAsPage, ifStringContains } from '../helper-functions';

/**
 * Imitation of email notification.
 * @returns {user.email, message}
 */

const sendNotifications = async ticket => {

  const user = await User.findOne({ _id: ticket.authorId });

  if (user) {
    console.log('Send notification to ' + user.email);
    console.log(ticket);
  } else {
    console.log('User not found!');
  }

};


/**
 * Gets one listRoles of tickets if called with listRoles and limit,
 * if not - returns full list of tickets
 * @headers {number} listRoles: req.headers.listRoles
 * @headers {number} limit: req.headers.limit
 *
 */
const listTickets = async (req, res) => {

  const tickets = await
    Ticket.find({})
          .populate({ path: 'authorId', model: User })
          .populate({ path: 'branchId', model: Branch })
          .sort({ created: '-1' });

  if (tickets) {

    const page = req.headers.page && req.headers.limit
      ? await getAsPage(req.headers.page, req.headers.limit, tickets)
      : tickets;

    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Get ticket
 * @requires {objectId} id: req.params.id
 * @returns {Ticket}
 */
const getTicket = async (req, res) => {

  const ticket = await Ticket.findOne({ _id: req.params.id })
                             .populate({ path: 'authorId', model: User })
                             .populate({ path: 'branchId', model: Branch });

  if (ticket) {
    res.json(ticket);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Find tickets by query, by subject, name or surname
 *
 * @requires {number} listRoles: req.headers.listRoles
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
const searchTicket = async (req, res) => {

  const search = req.headers.search;

  const tickets = await Ticket.find({})
                              .populate({ path: 'authorId', model: User })
                              .populate({ path: 'branchId', model: Branch })
                              .sort({ created: '-1' });

  if (tickets) {

    let filtered = [];

    for (let index = 0; index < tickets.length; index++) {
      if (ifStringContains(tickets[index].subject, search)) {
        filtered.push(tickets[index]);
      } else {
        if (ifStringContains(tickets[index].authorId.name, search)) {
          filtered.push(tickets[index]);
        } else {
          if (ifStringContains(tickets[index].authorId.surname, search)) {
            filtered.push(tickets[index]);
          }
        }
      }
    }

    const page = await getAsPage(req.headers.page, req.headers.limit, filtered);
    return res.json(page);

  } else {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }


};

/**
 * Function creates new Ticket
 *
 * @requires author: req.body.author,
 * @requires branch: req.body.branch,
 * @requires message: req.body.message,
 * @requires note: req.body.note,
 * @requires subject: req.body.subject,
 *
 * @param req
 * @param res
 *
 * @returns {Ticket}
 */
const addTicket = async (req, res) => {

  const newTicket = await new Ticket({
    name: req.body.name,
    description: req.body.description,
    authorId: req.body.author,
    branchId: req.body.branch,
    status: req.body.status || 'Opened',
    subject: req.body.subject,
    message: req.body.message,
    note: req.body.note
  });

  if (!ifArrayContains(newTicket.status, defaultStatuses) || req.body.status === 'Closed') {

    return res.sendStatus(httpStatus.BAD_REQUEST);

  } else {

    const savedTicket = await newTicket.save();

    if (savedTicket) {
      await sendNotifications(savedTicket);
      res.status(201).json(savedTicket);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }

};

/**
 * Update existing ticket
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} note: req.body.note
 * @parameter {string} status: req.body.status
 *
 * @returns {Ticket} Returns updated ticket
 */
const updateTicket = async (req, res) => {

  const ticket = await Ticket.findOne({ _id: req.params.id });

  if (ticket) {

    const data = {
      note: req.body.note,
      status: req.body.status,
      closed: req.body.status === 'Closed' ? Date.now() : null
    };

    if (!ifArrayContains(data.status, defaultStatuses)) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else {
      const updatedTicket = await
        Ticket.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });
      await sendNotifications(ticket);
      res.json(updatedTicket);
    }
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};


export { listTickets, getTicket, searchTicket, addTicket, updateTicket };

