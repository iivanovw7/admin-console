import History from '../../models/History';
import Role from '../../models/Role';
import User from '../../models/User';
import Branch from '../../models/Branch';
import Group from '../../models/Group';
import { authRoles } from '../config/constants.config';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

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
export function setQueryLimit(months = 11) {

  let limit = new Date();

  limit.setMonth(limit.getMonth() - months);

  return limit;

}

// Function adds new object in history db
export function addHistory(req, res, params, changes) {

  const newHistory = new History({
    actionAuthor: req.headers.user,
    actionTargetModel: params.targetModel,
    actionTarget: req.params.id,
    actionType: params.actionType,
    actionChanges: changes
  });

  newHistory.save()
            .then()
            .catch(err => console.log(err));

}

/**
 * Function finds user and returns users role CODE
 * if no user or no code found - returns null
 *
 */
export const getUserRoleCode = async id => {

  //console.log('started role search');

  const user = await User.findOne({ _id: id })
                         .populate({ path: 'role', model: Role });

  if (user) {
    //console.log('User has role parameter');
    return user.role.code;
  } else {
    //console.log('User does not have role parameter!');
    return null;
  }


};

/**
 * Function finds user and returns users branch parameters
 * if no user or no branch found - returns null
 *
 */
export const getUserBranch = async id => {

  const user = await User.findOne({ _id: id })
                         .populate({ path: 'branch', model: Branch });

  if (user.branch) {
    return user.branch;
  }
  //console.log('User does not have branch parameter!');
  return null;

};

/**
 * Function finds user and returns users branch parameters
 * if no user or no branch found - returns null
 *
 */
export const getUserGroup = async id => {

  const user = await User.findOne({ _id: id })
                         .populate({ path: 'group', model: Group });

  if (user.group) {
    return user.group;
  }

  //console.log('User does not have group parameter!');

  return null;

};

/**
 * Function checks user object in header of request and compares
 * it to users list, and then checks access rights
 *
 */
export const checkAccess = async (req, res, next) => {

  if (!ObjectId.isValid(req.user._id)) {
    //console.log('Wrong user id!');
    return res.sendStatus(httpStatus.BAD_REQUEST);
  } else {

    const id = ObjectId(req.user._id);

    const role = await getUserRoleCode(id);

    if (!role || !ifArrayContains(role, authRoles)) {
      //console.log('Authentication error');
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    //console.log('Request authorised!');

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
export function ifArrayContains(element, list) {

  for (const current of list) {
    if (current === element) {
      return true;
    }
  }
  return false;
}

