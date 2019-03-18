import httpStatus from 'http-status';
import Role from '../../db/models/Role';
import User from '../../db/models/User';
import Branch from '../../db/models/Branch';
import Group from '../../db/models/Group';
import Message from '../../db/models/Message';
import { fullAccess, branchAccess, groupAccess } from '../config/param-messages';
import { checkElement, formPage } from './helper-functions';

/**
 * Imitation of email notification.
 *
 */

const notification = async (message) => {

  const user = await User.findOne({ _id: message.senderId });

  const byBranch = message.branchId ? await User.find({ branch: message.branchId }) : null;
  const byGroup = message.groupId ? await User.find({ group: message.groupId }) : null;


  if (user) {
    console.log(`Sending notification, message author: ${user.email}`);
    if (byBranch) {
      console.log(`To recipients by branch: ${byBranch}`);
    }
    if (byGroup) {
      console.log(`To recipients by group: ${byGroup}`);
    }
    console.log(message);
  } else {
    console.log('User not found!');
  }

};


/**
 *  Function gets user from db
 */
export const getUser = async (params) => {

  return await User.findOne(params)
                   .populate({ path: 'role', model: Role });

};

/**
 * Function gets list of messages from db
 * @param req
 * @param res
 * @param params
 * @param pagination
 *
 * @returns {Messages}
 */
async function getMessages(req, res, params, pagination) {

  const messages = await Message.find(params)
                                .populate({ path: 'senderId', model: User })
                                .populate({ path: 'branchId', model: Branch })
                                .populate({ path: 'groupId', model: Group })
                                .sort({ created: '-1' });

  if (messages) {

    if (pagination) {

      const page = await formPage(req.headers.page, req.headers.limit, messages);
      return res.json(page);

    } else {
      return res.json(messages);
    }

  } else {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

}

/**
 * Return full messages list.
 * @returns {tickets[]}
 */
const list = async (req, res) => {

  const user = await getUser({ _id: req.headers.user });
  const role = user.role.code;

  if (checkElement(role, fullAccess)) {

    return getMessages(req, res, {}, false);

  } else {

    if (checkElement(role, branchAccess)) {

      return getMessages(req, res, { branchId: user.branch }, false);

    } else {

      return getMessages(req, res, { groupId: user.group }, false);

    }

  }

};

/**Return one page from full messages list
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @returns  {page}
 */
const page = async (req, res) => {

  const user = await getUser({ _id: req.headers.user });
  const role = user.role.code;

  if (checkElement(role, fullAccess)) {

    return getMessages(req, res, {}, true);

  } else {

    if (checkElement(role, branchAccess)) {

      return getMessages(req, res, { branchId: user.branch }, true);

    } else {

      return getMessages(req, res, { groupId: user.group }, false);

    }
  }
};

/**
 * Get message
 * @requires {objectId} id: req.params.id
 * @returns {message}
 */
const get = async (req, res) => {

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
const pageByGroup = async (req, res) => {

  return getMessages(req, res, { groupId: req.params.id }, true);

};

/**
 * Get messages by branch id
 * @requires {objectId} id: req.params.id
 * @returns {messages}
 */
const pageByBranch = async (req, res) => {

  return getMessages(req, res, { branchId: req.params.id }, true);

};

/**
 * Get messages by sender id
 * @requires {objectId} id: req.params.id
 * @returns {messages}
 */
const pageByUser = async (req, res) => {

  return getMessages(req, res, { senderId: req.params.id }, true);

};

/**
 * Function sends new message to group or branch members
 *
 * @param req
 * @param res
 * @returns {message}
 */
const send = async (req, res) => {

  function checkSender(list) {
    return (checkElement(role, fullAccess) || checkElement(role, list))
  }

  const user = await getUser({ _id: req.headers.user });
  const role = user.role.code;

  const message = {

    subject: req.body.subject,
    message: req.body.message,
    senderId: req.headers.user,
    branchId: checkSender(branchAccess) ? req.headers.branch : null,
    groupId: checkSender(groupAccess) ? req.headers.group : null

  };

  const newMessage = await new Message(message);
  const savedMessage = await newMessage.save();

  if (savedMessage) {
    await notification(savedMessage);
    res.status(201).json(savedMessage);
  } else {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

};


/**
 * TODO TESTING search and message creation algo with different access rights and types of users
 */

/**Finds messages by subject, name or surname
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
const search = async (req, res) => {

  const user = await getUser({ _id: req.headers.user });
  const role = user.role.code;

  const byBranch = checkElement(role, branchAccess) ? { branchId: user.branch } : {};
  const byGroup = checkElement(role, groupAccess) ? { groupId: user.group } : {};

  //query db for messages by subject
  const bySubj = await Message.find({
    $and: [
      byBranch,
      byGroup,
      { subject: { $regex: req.headers.search, $options: 'i' } }
    ]
  });

  //query db for possible authors of message
  const users = await User.find({
    $and: [
      byBranch,
      byGroup,
      { name: req.headers.search }, { surname: req.headers.search }
    ]
  });

  if (bySubj || users) {

    //getting ids of users
    const ids = users.map((user) => {
      return user._id;
    });

    //querying db for tickets by user names
    const byUser = await Message.find({ authorId: { $in: ids } });

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


export { list, page, get, pageByGroup, pageByBranch, pageByUser, send, search };

