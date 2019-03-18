import History from '../../../db/models/History';
import Role from '../../../db/models/Role';
import User from '../../../db/models/User';
import Branch from '../../../db/models/Branch';
import Group from '../../../db/models/Group';
import { authRoles } from '../../config/param-auth';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

export const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


/**
 * Forms value in months for date filter
 * Originally, time periods starting from 3 up to 12 months should be used
 *
 * @param months
 * @returns {Date}
 */
export function setLimit(months = 12) {

  const value = months;

  let limit = new Date();

  limit.setMonth(limit.getMonth() - value);

  return limit;

}

/**
 *Function adds new object in history db
 *
 */
export function addHistory(req, res, params, target) {

  const newHistory = new History({
    author: req.headers.user,
    targetModel: params.targetModel,
    targetId: req.params.id,
    actionType: params.actionType,
    target: target
  });

  newHistory.save()
            .then(history => console.log(history))
            .catch(err => console.log(err));

}

/**
 * Function finds user and returns users role CODE
 * if no user or no code found - returns null
 *
 */
export const getUserRole = async (id) => {

  const user = await User.findOne({ _id: id })
                         .populate({ path: 'role', model: Role });

  if (user) {
    return user.role.code;
  } else {
    console.log('User does not have role parameter!');
    return null;
  }

};

/**
 * Function finds user and returns users branch parameters
 * if no user or no branch found - returns null
 *
 */
export const getUserBranch = async (id) => {

  const user = await User.findOne({ _id: id })
                         .populate({ path: 'branch', model: Branch });

  console.log(user);
  if (user.branch) {
    return [user.branch._id, user.branch.name];
  } else {
    console.log('User does not have branch parameter!');
    return null;
  }

};

/**
 * Function finds user and returns users branch parameters
 * if no user or no branch found - returns null
 *
 */
export const getUserGroup = async (id) => {

  const user = await User.findOne({ _id: id })
                         .populate({ path: 'group', model: Group });

  if (user.group) {
    return [user.group._id, user.group.name];
  } else {
    console.log('User does not have group parameter!');
    return null;
  }

};

/**
 * Function checks user object in header of request and compares
 * it to users list, and then checks access rights
 *
 */
export const checkAccess = async (req, res, next) => {

  const id = mongoose.Types.ObjectId(req.headers.user);

  const role = await getUserRole(id);

  if (!role && !checkElement(role, authRoles)) {
    console.log('Authentication error');
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  } else {
    console.log('Request authorised!');
    return next();
  }

};

/**
 * Function checks if element is in the list.
 * Used for validating roles and groups which are being deleted
 *
 * @param element
 * @param list
 * @returns {boolean}
 */
export function checkElement(element, list) {
  for (const current of list) {
    if (current === element) {
      return true;
    }
  }
  return false;
}

/**
 * Function forms one page of objects out of incoming list of objects
 * no mater what list it got in parameters
 *
 * @param currPage: {number}, current page number
 * @param currLimit: {number}, number of elements for one page
 * @param list: {[]}, array of objects
 *
 * @returns {Promise<{output: *[], pages: number, limit: *, page: *}>}
 */
export const formPage = async (currPage = 1, currLimit = 10, list = []) => {

  //needed to keep input numbers inside certain limits
  //in order to prevent unpredicted outputs
  function limitInt(min, max, val) {
    return Math.round(Math.min(Math.max(val, min), max));
  }

  //applying limits of elements for one page
  const limit = limitInt(1, 25, currLimit);
  //applying limits for maximum page number value
  const pages = Math.ceil(list.length / limit);
  //applying limits for input pageNumber value
  const page = limitInt(1, pages, currPage);

  const skipped = (page * limit) - limit;
  const output = list.slice(skipped, skipped + limit);

  return { page, limit, pages, output };
};
