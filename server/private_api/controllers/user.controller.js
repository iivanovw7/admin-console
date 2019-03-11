const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
const httpStatus = require('http-status');
import { formPage } from './helper-functions';

/**
 * Get user list.
 * @returns {User[]}
 */
export const list = async (req, res) => {

  const users = await
    User.find({})
        .populate({ path: 'role', model: Role });

  if (users) {
    res.status(200).json([
      { Total: users.length },
      { Results: users }]
    );
  } else {
    res.send(httpStatus.NOT_FOUND);
  }

};

/**
 * Get user
 * @requires {objectId} id: req.params.id
 * @returns {User}
 */
export const get = async (req, res) => {

  const user = await
    User.findOne({ _id: req.params.id })
        .populate({ path: 'role', model: Role });

  if (user) {
    res.status(200).json(
      [
        { Results: user }
      ]);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }

};

/**Get one page of users
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
export const page = async (req, res) => {

  const users = await
    User.find({})
        .sort({ surname: 'asc' });

  if (users) {
    const page = await
      formPage(
        req.headers.page,
        req.headers.limit,
        users,
        users.length
      );
    res.status(200).json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**Find users by group id
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {objectId} id: req.params.id
 */
export const group = async (req, res) => {
  const users = await
    User.find({ group: req.params.id })
        .sort({ surname: 'asc' });

  if (users) {
    const page = await
      formPage(
        req.headers.page,
        req.headers.limit,
        users,
        users.length
      );
    res.status(200).json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**Find users by branch id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
export const branch = async (req, res) => {

  const users = await
    User.find({ group: req.params.id })
        .sort({ surname: 'asc' });

  if (users) {
    const page = await
      formPage(
        req.headers.page,
        req.headers.limit,
        users,
        users.length
      );
    res.status(200).json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**Find users by query, by name or email
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
export const search = async (req, res) => {

  const users = await User.find({
    $or: [
      { name: req.headers.search },
      { surname: req.headers.search },
      { email: req.headers.search }
    ]
  }).sort({ surname: 'asc' });

  if (users) {
    const page = await
      formPage(
        req.headers.page,
        req.headers.limit,
        users,
        users.length
      );
    res.status(200).json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
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
export const update = async (req, res) => {

  const data = {
    group: req.headers.group,
    branch: req.headers.branch,
    role: req.headers.role,
    status: req.headers.status
  };

  const user = await
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );

  if (user) {
    res.status(200).json(user);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};

/**
 * Delete user.
 * @returns {User}
 */
export const remove = async (req, res) => {

  const user = await
    User.findByIdAndRemove(
      { _id: req.params.id }
    );

  if (user) {
    res.status(200).json(user);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};


module.exports = { list, get, page, group, branch, search, update, remove };

