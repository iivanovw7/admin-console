import Role from '../../../db/models/Role';
import User from '../../../db/models/User';
import { authRoles } from '../../config/param-auth';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

export const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 *Function checks user object in header of request and compares
 * it to users list, and then checks access rights
 *
 */
export const checkAccess = async (req, res, next) => {

  const id = mongoose.Types.ObjectId(req.headers.user);

  await User.findOne({ _id: id })
            .populate({ path: 'role', model: Role })
            .then(user => {
              if (!user || !checkElement(user.role.code, authRoles)) {
                console.log('Authentication error');
                return res.sendStatus(httpStatus.UNAUTHORIZED);
              } else {
                console.log('Request authorised!');
                return next();
              }
            });
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
