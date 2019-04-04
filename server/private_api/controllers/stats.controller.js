import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Ticket from '../../models/Ticket';
import User from '../../models/User';
import Group from '../../models/Group';
import Message from '../../models/Message';
import { defaultStatusModels } from '../config/constants.config';
import { setQueryLimit, getUserRoleCode, getUserBranch, getUserGroup } from '../helper-functions';

const ObjectId = mongoose.Types.ObjectId;

/**
 * Function calculates total number of users according to params
 * It is called by getStatistics function with query parameters
 * @param limit
 * @param param
 * @returns {Promise<{total}>}
 */
const usersCounter = async (limit, param) => {

  const totalQuery = { created: { $gt: limit } };
  const activeQuery = { created: { $gt: limit }, status: true };
  const disabledQuery = { created: { $gt: limit }, status: false };

  //if group or branch id passed - addRole it into query
  if (param !== undefined) {
    if (ObjectId.isValid(param.branch)) {
      totalQuery['branch'] = activeQuery['branch'] = disabledQuery['branch'] = param.branch;
    } else {
      if (ObjectId.isValid(param.group)) {
        totalQuery['group'] = activeQuery['group'] = disabledQuery['group'] = param.group;
      }
    }
  }

  const totalPromise = User.countDocuments(totalQuery);
  const openedPromise = User.countDocuments(activeQuery);
  const progressPromise = User.countDocuments(disabledQuery);

  const [total, active, disabled] = await Promise.all([
    totalPromise,
    openedPromise,
    progressPromise
  ]);

  return {
    total,
    active,
    disabled
  };

};

/**
 * Function calculates total number of messages according to params
 * It is called by It is called called by getStatistics function with query parameters
 * @param limit
 * @param param
 * @returns {Promise<{total}>}
 */
const messagesCounter = async (limit, param) => {

  const totalQuery = { created: { $gt: limit } };

  //if group or branch id passed - addRole it into query
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

      //if params exists - addRole fields to query
      if (params) {
        if (params.branchId) {
          query.branchId = params.branchId;
        }
        if (params.authorId) {
          query.authorId = params.authorId;
        }
      }

      //addRole current field in query
      queries[entry[0]] = query;
    });

    const totalPromise = Ticket.countDocuments({});
    const openedPromise = Ticket.countDocuments(queries.open);
    const progressPromise = Ticket.countDocuments(queries.progress);
    const closedPromise = Ticket.countDocuments(queries.closed);
    const reopenedPromise = Ticket.countDocuments(queries.reopened);
    const cannot_be_donePromise = Ticket.countDocuments(queries.cannot_be_done);

    const [total, opened, progress, closed, reopened, cannot_be_done] =
      await Promise.all([
        totalPromise,
        openedPromise,
        progressPromise,
        closedPromise,
        reopenedPromise,
        cannot_be_donePromise
      ]);

    //return calculation with parameters
    return {
      total,
      opened,
      progress,
      closed,
      reopened,
      cannot_be_done
    };
  }

  //if additional parameters passed - call counter with params
  if (param !== undefined) {

    //if branch id has been passed - call counter only inside the branch
    if (ObjectId.isValid(param.branch)) {
      return await count({ branchId: param.branch });
    } else {

      //if branch has not been passed - call counter within group by authors id
      //count only authors data inside certain group
      const users = await User.find({ group: param.group });

      const ids = users.map((user) => {
        return user._id;
      });

      return await count({ authorId: ids });
    }

  } else {

    //if no params passed - call counter with default params
    return await count();

  }
};

/**
 * Function calls counter functions according to data types and privileges
 * @returns {Promise<{total}>}
 */
async function getStatistics(req, res, next) {

  //sets time limit in months
  const limit = setQueryLimit(req.query.months);
  //gets users id
  const id = mongoose.Types.ObjectId(req.user._id);
  //gets user role
  const role = await getUserRoleCode(id);

  switch (role) {

    //gets full with no additional parameters
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
          { branch_name: branch.name },
          await next(limit, { branch: branch._id })
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
          { group_name: group.name },
          await next(limit, { group: group._id })
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
 * @param req.query.user - user id
 * @param req.query.month - time limit to collect data
 * returns callback()
 */
const usersStats = async (req, res) => {

  return getStatistics(req, res, usersCounter);

};

/**
 * Gets number of messages
 * @param req.query.user - user id
 * @param req.query.month - time limit to collect data
 * returns callback()
 *
 */
const messagesStats = async (req, res) => {

  return getStatistics(req, res, messagesCounter);

};

const groupsStats = async (req, res) => {

  const total = await await Group.countDocuments({});
  const active = await Group.countDocuments({ status: true });
  const disabled = await Group.countDocuments({ status: false });

  res.json({ total: total, active: active, disabled: disabled });

};

/**
 * Gets number of permissions
 * @param req.query.user - user id
 * @returns {{total, active, disabled}}
 */
const permissionsStats = async (req, res) => {

  const countPerm = await Group.countDocuments({});
  const activePerm = await Group.countDocuments({ permissions: true });
  const disabledPerm = await Group.countDocuments({ permissions: false });

  res.json({ total: countPerm, active: activePerm, disabled: disabledPerm });

};

/**
 * Gets numbers of tickets by categories.
 * Gets total.
 * @param req.query.user - user id
 * @returns {{total, opened, in_progress, closed, reopened, cannot_be_done}}
 */
const ticketsStats = async (req, res) => {

  return getStatistics(req, res, ticketsCounter);

};

export { usersStats, permissionsStats, ticketsStats, groupsStats, messagesStats };

