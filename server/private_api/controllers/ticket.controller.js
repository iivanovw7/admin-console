import httpStatus from 'http-status';
import Ticket from '../../db/models/Ticket';
import User from '../../db/models/User';
import Branch from '../../db/models/Branch';
import { defaultStatuses } from '../config/param-tickets';
import { checkElement, formPage } from './helper-functions';


/**
 * Imitation of email notification.
 * @returns {user.email, message}
 */

const notification = async (ticket) => {

  const user = await User.findOne({ _id: ticket.authorId});

  if (user) {
    console.log('Send notification to ' + user.email);
    console.log(ticket)
  } else {
    console.log('User not found!');
  }

};

/**
 * Get tickets list.
 * @returns {tickets[]}
 */
const list = async (req, res) => {

  const tickets = await Ticket.find({})
                              .populate({ path: 'authorId', model: User })
                              .populate({ path: 'branchId', model: Branch })
                              .sort({ created: '-1' });

  if (tickets) {
    res.json(tickets);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**Get one page of tickets
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
const page = async (req, res) => {

  const tickets = await
    Ticket.find({})
          .sort({ created: '-1' });

  if (tickets) {
    const page = await formPage(req.headers.page, req.headers.limit, tickets);
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
const get = async (req, res) => {

  const ticket = await Ticket.findOne({ _id: req.params.id })
                             .populate({ path: 'authorId', model: User })
                             .populate({ path: 'branchId', model: Branch });

  if (ticket) {
    res.json(ticket);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**Find tickets by query, by subject, name or surname
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
const search = async (req, res) => {

  //query db for tickets by subject
  const bySubj = await Ticket.find({
    $or: [{ subject: { $regex: req.headers.search, $options: 'i' } }]
  });

  //query db for possible authors of tickets
  const users = await User.find({
    $or: [{ name: req.headers.search }, { surname: req.headers.search }]
  });

  if (bySubj || users) {

    //getting ids of users
    const ids = users.map((user) => {
      return user._id;
    });

    //querying db for tickets by user names
    const byUser = await Ticket.find({ authorId: { $in: ids } });

    //joining and sorting results
    const sortedResult = [...bySubj, ...byUser].sort((a, b) => {
        const dateA = new Date(a.created), dateB = new Date(b.created);
        return dateB - dateA;
      }
    );

    if (!sortedResult) {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const page = await formPage(req.headers.page, req.headers.limit, sortedResult);
      res.json(page);
    }

  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Function creates new Ticket
 *
 * @requires author: req.headers.author,
 * @requires branch: req.headers.branch,
 * @requires message: req.headers.message,
 * @requires note: req.headers.note,
 * @requires subject: req.headers.subject,
 *
 * @param req
 * @param res
 *
 * @returns {Ticket}
 */
const add = async (req, res) => {

  const newTicket = await new Ticket({
    name: req.headers.name,
    description: req.headers.description,
    authorId: req.body.authorId,
    branchId: req.body.branchId,
    status: req.headers.status || 'Opened',
    subject: req.headers.subject,
    message: req.headers.message,
    note: req.headers.note,
  });

  if (!checkElement(newTicket.status, defaultStatuses) || req.headers.status === 'Closed') {

    return res.sendStatus(httpStatus.BAD_REQUEST);

  } else {

    const savedTicket = await newTicket.save();

    if (savedTicket) {
      await notification(savedTicket);
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
 * @parameter {string} note: req.headers.note
 * @parameter {string} status: req.headers.status
 *
 * @returns {Ticket} Returns updated ticket
 */
const update = async (req, res) => {

  const ticket = await Ticket.findOne({ _id: req.params.id });

  if (ticket) {

    const data = {
      note: req.headers.note,
      status: req.headers.status,
      closed: req.headers.status === 'Closed' ? Date.now() : null
    };

    if (!checkElement(data.status, defaultStatuses)) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else {
      const updatedTicket = await
        Ticket.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });
      await notification(ticket);
      res.json(updatedTicket);
    }
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};



export { list, page, get, search, add, update };

