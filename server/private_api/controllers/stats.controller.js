import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Ticket from '../../db/models/Ticket';
import User from '../../db/models/User';
import Group from '../../db/models/Group';
import Message from '../../db/models/Message';
import { defaultStatusModels } from '../config/param-tickets';
import { setLimit, getUserRole, getUserBranch, getUserGroup } from './helper-functions';

const ObjectId = mongoose.Types.ObjectId;

/**
 * Function calculates total number of users according to params
 * It is called by It is called called by getStatistics function with query parameters
 *
 * @param limit
 * @param param
 * @returns {Promise<{total}>}
 */
const usersCounter = async (limit, param) => {

  const totalQuery = { created: { $gt: limit } };
  const activeQuery = { created: { $gt: limit }, status: true };
  const disabledQuery = { created: { $gt: limit }, status: false };

  if (param !== undefined) {
    if (ObjectId.isValid(param.branch)) {
      totalQuery['branch'] = param.branch;
      activeQuery['branch'] = param.branch;
      disabledQuery['branch'] = param.branch;
    } else {
      if (ObjectId.isValid(param.group)) {
        totalQuery['group'] = param.group;
        activeQuery['group'] = param.group;
        disabledQuery['group'] = param.group;
      }
    }
  }

  return {
    total: await User.countDocuments(totalQuery),
    active: await User.countDocuments(activeQuery),
    disabled: await User.countDocuments(disabledQuery)
  };

};

/**
 * Function calculates total number of messages according to params
 * It is called by It is called called by getStatistics function with query parameters
 *
 * @param limit
 * @param param
 * @returns {Promise<{total}>}
 */
const messagesCounter = async (limit, param) => {

  const totalQuery = { created: { $gt: limit } };

  if (param !== undefined) {
    if (ObjectId.isValid(param.branch)) {
      totalQuery['branchId'] = param.branch;
    } else {
      if (ObjectId.isValid(param.group)) {
        totalQuery['groupId'] = param.group;
      }
    }
  }
  return {
    total: await Message.countDocuments(totalQuery)
  };

};


/**
 * Function calculates tickets and returns stats.
 * It is called called by getStatistics function with query parameters
 *
 * @param limit
 * @param param
 * @returns {Promise<*>}
 */
const ticketsCounter = async (limit, param) => {


  async function count(params) {

    //final search queries object
    const queries = {};

    Object.entries(defaultStatusModels).forEach(entry => {

      //creating base search query
      const query = {
        created: { $gt: limit }
      };

      //if params exists - add fields to query
      if (params) {
        if (params.branchId) {
          query.branchId = params.branchId;
        }
        if (params.authorId) {
          query.authorId = params.authorId;
        }
      }

      //if calculation is not total add status filter fields from array
      if (entry[0] !== 'total') {
        query.status = entry[1];
      }

      //add current field in query
      queries[entry[0]] = query;
    });

    //return calculation with parameters
    return {
      total: await Ticket.countDocuments(queries.total),
      opened: await Ticket.countDocuments(queries.open),
      progress: await Ticket.countDocuments(queries.progress),
      closed: await Ticket.countDocuments(queries.closed),
      reopened: await Ticket.countDocuments(queries.reopened),
      cannot_be_done: await Ticket.countDocuments(queries.cannot_be_done)
    };
  }

  if (param !== undefined) {

    if (ObjectId.isValid(param.branch)) {
      return await count({ branchId: param.branch });
    } else {
      const users = await User.find({ group: param.group });

      const ids = users.map((user) => {
        return user._id;
      });

      return await count({ authorId: ids });
    }

  } else {

    return await count();

  }
};


/**
 * Function calls counter functions according to data types and privileges
 *
 * @returns {Promise<{total}>}
 */
async function getStatistics(req, res, next) {

  //sets time limit in moths
  const limit = setLimit(req.headers.months);
  //gets users id
  const id = mongoose.Types.ObjectId(req.headers.user);
  //gets users role
  const role = await getUserRole(id);

  switch (role) {

    case 'ADMIN' || 'SUPPORT': {
      res.json([
        { view_mode: role },
        await next(limit)
      ]);
      break;
    }

    //gets full statistics for branch
    case 'BRANCH_ADMIN' || 'BRANCH_SUPPORT': {

      //gets branch id of user, if no branch - returns error
      const branch = await getUserBranch(id);

      if (branch) {

        res.json([
          { view_mode: role },
          { branch_name: branch[1] },
          await next(limit, { branch: branch[0] })
        ]);

      } else {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
      break;

    }

    //gets full statistics for group
    case 'MANAGER': {

      //gets group id of user, if no group - returns error
      const group = await getUserGroup(id);

      if (group) {

        res.json([
          { view_mode: role },
          { group_name: group[1] },
          await next(limit, { group: group[0] })
        ]);

      } else {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
      break;
    }

    //if no role found or wrong role - returns access error
    default: {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      break;
    }
  }

}

/**
 * Gets number of users
 * @param req.headers.user - user id
 * @param req.headers.month - time limit to collect data
 *
 * returns callback()
 *
 */
const users = async (req, res) => {

  return getStatistics(req, res, usersCounter);

};

/**
 * Gets number of messages
 * @param req.headers.user - user id
 * @param req.headers.month - time limit to collect data
 *
 * returns callback()
 *
 */
const messages = async (req, res) => {

  return getStatistics(req, res, messagesCounter);

};

const groups = async (req, res) => {

  const total = await await Group.countDocuments({});
  const active = await Group.countDocuments({ status: true });
  const disabled = await Group.countDocuments({ status: false });

  res.json({ total: total, active: active, disabled: disabled });

};

/**
 * Gets number of permissions
 * @param req.headers.user - user id
 *
 * @returns {{total, active, disabled}}
 */
const permissions = async (req, res) => {

  const countPerm = await Group.countDocuments({});
  const activePerm = await Group.countDocuments({ permissions: true });
  const disabledPerm = await Group.countDocuments({ permissions: false });

  res.json({ total: countPerm, active: activePerm, disabled: disabledPerm });

};

/**
 * Gets numbers of tickets by categories.
 * Gets total.
 * @param req.headers.user - user id
 *
 * @returns {{total, opened, in_progress, closed, reopened, cannot_be_done}}
 */

const tickets = async (req, res) => {

  return getStatistics(req, res, ticketsCounter);

};

export { users, permissions, tickets, groups, messages };

