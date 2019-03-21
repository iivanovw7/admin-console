import httpStatus from 'http-status';
import Group from '../../models/Group';
import Role from '../../models/Role';
import User from '../../models/User';
import History from '../../models/History';
import { getAsPage, addHistory, setQueryLimit } from '../helper-functions';

/**
 * Get user
 * @requires {objectId} id: req.params.id
 * @returns {User}
 */
const getUser = async (req, res) => {

  const user = await User.findOne({ _id: req.params.id })
                         .populate({ path: 'role', model: Role })
                         .populate({ path: 'group', model: Group });

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Get one listRoles of users
 *
 * @headers {number} listRoles: req.headers.listRoles
 * @headers {number} limit: req.headers.limit
 *
 * @returns {listRoles} Returns single listRoles or full list
 *
 */
const listUsers = async (req, res) => {

  const users = await User.find({})
                          .populate({ path: 'role', model: Role })
                          .populate({ path: 'group', model: Group })
                          .sort({ surname: 'asc' });

  if (users) {

    const page = req.headers.page && req.headers.limit
      ? await getAsPage(req.headers.page, req.headers.limit, users)
      : users;

    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};


/**Find users by group id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} listRoles: req.headers.listRoles
 * @requires {number} limit: req.headers.limit
 *
 */
const getUsersByGroup = async (req, res) => {

  const users = await User.find({ group: req.params.id })
                          .sort({ surname: 'asc' });

  if (users) {
    const page = await getAsPage(req.headers.page, req.headers.limit, users);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**Find users by branch id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} listRoles: req.headers.listRoles
 * @requires {number} limit: req.headers.limit
 *
 */
const getUsersByBranch = async (req, res) => {

  const users = await User.find({ branch: req.params.id })
                          .sort({ surname: 'asc' });

  if (users) {
    const page = await getAsPage(req.headers.page, req.headers.limit, users);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**Find users by query, by name or email
 *
 * @requires {number} listRoles: req.headers.listRoles
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
const searchUsers = async (req, res) => {

  const users = await User.find({
    $or: [
      { name: req.headers.search },
      { surname: req.headers.search },
      { email: req.headers.search }
    ]
  }).sort({ surname: 'asc' });

  if (users) {
    const page = await getAsPage(req.headers.page, req.headers.limit, users);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};


/**
 * Update existing use
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} group: req.headers.group
 * @parameter {string} branch: req.headers.branch
 * @parameter {string} role: req.headers.role
 * @parameter {string} status: req.headers.status
 * @returns {User}
 */
const updateUser = async (req, res) => {

  const data = {
    group: req.body.group,
    branch: req.body.branch,
    role: req.body.role,
    status: req.body.status
  };

  const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });

  if (user) {

    //addRole information about changes in history database
    addHistory(req, res, { actionType: 'Update', targetModel: 'User' }, data);

    res.json(user);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**
 * Function finds changes made by user in history db
 * returns list of changes with pagination for time period 3 months min
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getUserHistory = async (req, res) => {

  const limit = setQueryLimit(req.headers.months);

  const records = await
    History.find({ created: { $gt: limit }, targetId: req.params.id })
           .populate({ path: 'author', model: User })
           .sort({ created: '-1' });

  if (records) {
    const page = await getAsPage(req.headers.page, req.headers.limit, records);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }


};


export {
  getUser,
  listUsers,
  getUsersByGroup,
  getUsersByBranch,
  searchUsers,
  updateUser,
  getUserHistory
};

