import httpStatus from 'http-status';
import Group from '../../models/Group';
import Role from '../../models/Role';
import User from '../../models/User';
import History from '../../models/History';
import { addHistory, setQueryLimit } from '../helper-functions';

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
 * @query {number} listRoles: req.query.listRoles
 * @query {number} limit: req.query.limit
 *
 * @returns {listRoles} Returns single listRoles or full list
 *
 */
const listUsers = async (req, res) => {

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const findPromise = User.find({})
                          .populate({ path: 'role', model: Role })
                          .populate({ path: 'group', model: Group })
                          .sort({ surname: 'asc' })
                          .skip(skipped)
                          .limit(limit);

  const countPromise = User.countDocuments();

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

/**Find users by group id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} listRoles: req.query.listRoles
 * @requires {number} limit: req.query.limit
 *
 */
const getUsersByGroup = async (req, res) => {

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const findPromise = User.find({ group: req.params.id })
                          .populate({ path: 'role', model: Role })
                          .populate({ path: 'group', model: Group })
                          .sort({ surname: 'asc' })
                          .skip(skipped)
                          .limit(limit);

  const countPromise = User.countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (results === 0) {
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

/**Find users by branch id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} listRole req.query.listRoles
 * @requires {number} limit: req.query.limit
 *
 */
const getUsersByBranch = async (req, res) => {

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const findPromise = User.find({ branch: req.params.id })
                          .populate({ path: 'role', model: Role })
                          .populate({ path: 'group', model: Group })
                          .sort({ surname: 'asc' })
                          .skip(skipped)
                          .limit(limit);

  const countPromise = User.countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (results === 0) {
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

/**Find users by query, by name or email
 *
 * @requires {number} listRoles: req.query.listRoles
 * @requires {number} limit: req.query.limit
 * @requires {string} search: req.query.search
 */
const searchUsers = async (req, res) => {

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const query = {
    $or: [
      { name: req.query.search },
      { surname: req.query.search },
      { email: req.query.search }
    ]
  };

  const findPromise = User.find(query)
                          .populate({ path: 'role', model: Role })
                          .populate({ path: 'group', model: Group })
                          .sort({ surname: 'asc' })
                          .skip(skipped)
                          .limit(limit);

  const countPromise = User.countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (results === 0) {
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


/**
 * Update existing user
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} group: req.body.group
 * @parameter {string} branch: req.body.branch
 * @parameter {string} role: req.body.role
 * @parameter {string} status: req.body.status
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

  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page * limit) - limit;

  const queryLimit = setQueryLimit(req.query.months);
  const query = { created: { $gt: queryLimit }, actionTarget: req.params.id };

  const findPromise = await History.find(query)
                                   .populate({ path: 'author', model: User })
                                   .sort({ created: '-1' })
                                   .skip(skipped)
                                   .limit(limit);

  const countPromise = User.countDocuments();

  const [output, results] = await Promise.all([findPromise, countPromise]);

  const pages = Math.ceil(results / limit);

  if (results === 0) {
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

export {
  getUser,
  listUsers,
  getUsersByGroup,
  getUsersByBranch,
  searchUsers,
  updateUser,
  getUserHistory
};

