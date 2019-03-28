import httpStatus from 'http-status';
import Role from '../../models/Role';
import User from '../../models/User';
import Branch from '../../models/Branch';
import Group from '../../models/Group';
import Message from '../../models/Message';
import { fullAccess, branchAccess, groupAccess } from '../config/constants.config';
import { ifArrayContains } from '../helper-functions';

/**
 * Imitation of email notification.
 * Finds sender by id and throws contact details of its branch and group in console log
 * Also shows message passed in parameters
 * TODO Add notifications logic
 */
const sendNotifications = async message => {

  const user = await User.findOne({ _id: message.senderId });

  const byBranch = message.branchId ? await User.find({ branch: message.branchId }) : null;
  const byGroup = message.groupId ? await User.find({ group: message.groupId }) : null;

  if (user) {
    //console.log(`Sending notification, message author: ${user.email}`);
    if (byBranch) {
      //console.log(`To recipients by branch: ${byBranch}`);
    }
    if (byGroup) {
      //console.log(`To recipients by group: ${byGroup}`);
    }
    //console.log(message);
  } else {
    //console.log('User not found!');
  }

};

// Function gets user from db
export const getUser = async (params) => {

  return await User.findOne(params)
                   .populate({ path: 'role', model: Role });

};

// Function gets list of messages from db
async function collectMessages(req, res, params) {

  const page = req.headers.page || 1;
  const limit = parseInt(req.headers.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const findPromise = Message.find(params)
                             .populate({ path: 'senderId', model: User })
                             .populate({ path: 'branchId', model: Branch })
                             .populate({ path: 'groupId', model: Group })
                             .skip(skipped)
                             .limit(limit);

  const countPromise = Message.countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (!output && results === 0) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  res.json({
    page,
    limit,
    pages,
    results,
    output
  });

}

/**
 * Return one listRoles from full messages list
 * @headers {number} listRoles: req.headers.listRoles
 * @headers {number} limit: req.headers.limit
 * @returns  {listRoles}
 */
const listMessages = async (req, res) => {

  const user = await getUser({ _id: req.user._id });
  const role = user.role.code;

  if (ifArrayContains(role, fullAccess)) {

    return collectMessages(req, res, {});

  } else {

    if (ifArrayContains(role, branchAccess)) {
      return collectMessages(req, res, { branchId: user.branch });
    } else {
      return collectMessages(req, res, { groupId: user.group });
    }
  }
};

/**
 * Get message
 * @requires {objectId} id: req.params.id
 * @returns {message}
 */
const getMessage = async (req, res) => {

  const message = await Message.findOne({ _id: req.params.id })
                               .populate({ path: 'senderId', model: User })
                               .populate({ path: 'branchId', model: Branch })
                               .populate({ path: 'groupId', model: Group });

  if (message) {
    res.json(message);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Get messages by group id
 * @requires {objectId} id: req.params.id
 * @returns {messages}
 */
const getPageByGroup = async (req, res) => {

  return collectMessages(req, res, { groupId: req.params.id });

};

/**
 * Get messages by branch id
 * @requires {objectId} id: req.params.id
 * @returns {messages}
 */
const getPageByBranch = async (req, res) => {

  return collectMessages(req, res, { branchId: req.params.id });

};

/**
 * Get messages by sender id
 * @requires {objectId} id: req.params.id
 * @returns {messages}
 */
const getPageByUser = async (req, res) => {

  return collectMessages(req, res, { senderId: req.params.id });

};

/**
 * Function sends new message to group or branch members
 * @param req.body.subject,
 * @param req.body.message,
 * @param req.headers.user,
 * @param req.headers.branch,
 * @param req.headers.group,
 * @returns {message}
 */
const sendMessage = async (req, res) => {

  function checkSender(list) {
    return (ifArrayContains(role, fullAccess) || ifArrayContains(role, list));
  }

  const user = await getUser({ _id: req.user._id });
  const role = user.role.code;

  const message = {

    subject: req.body.subject,
    message: req.body.message,
    senderId: req.user._id,
    branchId: checkSender(branchAccess) ? req.headers.branch : null,
    groupId: checkSender(groupAccess) ? req.headers.group : null

  };

  const newMessage = await new Message(message);
  const savedMessage = await newMessage.save();

  if (savedMessage) {
    await sendNotifications(savedMessage);
    res.status(201).json(savedMessage);
  } else {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

};

/*

const searchTicket = async (req, res) => {

  const page = req.headers.page || 1;
  const limit = parseInt(req.headers.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  //querying tickets by subject
  const idQuery = { $or: [{ name: req.headers.search }, { surname: req.headers.search }] };

  //getting ids of tickets authors
  const userIDs = await User.find(idQuery).distinct('_id');

  //querying tickets
  const ticketQuery = {
    $or: [
      { subject: { $regex: req.headers.search, $options: 'i' } },
      { authorId: {$in: userIDs } }
    ]
  };

  const findPromise = await Ticket.find(ticketQuery).skip(skipped).limit(limit).sort({ created: '-1' });
  const countPromise = await Ticket.find(ticketQuery).countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (!output && results === 0) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  res.json({
    page,
    limit,
    pages,
    results,
    output
  });

};


 */


/**
 * Finds messages by subject, name or surname
 * @requires {number} listRoles: req.headers.listRoles
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
const searchMessages = async (req, res) => {

  const page = req.headers.page || 1;
  const limit = parseInt(req.headers.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  //string we are searching
  const search = req.headers.search;

  //users role code from database
  const user = await getUser({ _id: req.user._id });
  const role = user.role.code;

  //querying tickets by subject
  const idQuery = { $or: [{ name: search }, { surname: search }] };

  //getting ids of tickets authors
  const userIDs = await User.find(idQuery).distinct('_id');

  //querying tickets
  const messagesQuery = {
    $and: [
      {
        $or: [
          { subject: { $regex: search, $options: 'i' } },
          { authorId: { $in: userIDs } }
        ]
      }
    ]
  };

  //if user has access limit applying additional parameters to a search query
  if (ifArrayContains(role, branchAccess)) {
    messagesQuery.$and.push({ branchId: user.branch });
  }

  //if user has access limit applying additional parameters to a search query
  if (ifArrayContains(role, groupAccess)) {
    messagesQuery.$and.push({ groupId: user.group });
  }

  const findPromise = await Message.find(messagesQuery)
                                   .populate({ path: 'senderId', model: User })
                                   .populate({ path: 'branchId', model: Branch })
                                   .populate({ path: 'groupId', model: Group })
                                   .skip(skipped)
                                   .limit(limit)
                                   .sort({ created: '-1' });

  const countPromise = await Message.find(messagesQuery).countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (!output && results === 0) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  res.json({
    page,
    limit,
    pages,
    results,
    output
  });

};

/*


const searchMessages = async (req, res) => {

  const user = await getUser({ _id: req.user._id });
  const role = user.role.code; //users role code from database
  const baseQuery = {}; //base search query
  const search = req.headers.search; //string we are searching


  //if user has access limit applying additional parameters to a search query
  if (ifArrayContains(role, branchAccess)) {
    baseQuery.branchId = user.branch;
  }

  //if user has access limit applying additional parameters to a search query
  if (ifArrayContains(role, groupAccess)) {
    baseQuery.groupId = user.group;
  }

  const msg = await Message.find(baseQuery)
                           .populate({ path: 'senderId', model: User })
                           .populate({ path: 'branchId', model: Branch })
                           .populate({ path: 'groupId', model: Group })
                           .sort({ created: '-1' });

  if (msg) {

    let filtered = []; //initial search output
    let cachedLength = msg.length;

    for (let i = 0; i < cachedLength; i++) {

      let fields = [msg[i].subject, msg[i].senderId.name, msg[i].senderId.surname];

      if (ifStringsContain(fields, search)) {
        filtered.push(msg[i]); //adding new element in results
      }
    }

    const page = await getAsPage(req.headers.page, req.headers.limit, filtered);
    return res.json(page);

  } else {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

};


 */


export {
  listMessages,
  getMessage,
  getPageByGroup,
  getPageByBranch,
  getPageByUser,
  sendMessage,
  searchMessages
};

