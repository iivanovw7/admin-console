import httpStatus from 'http-status';
import Group from '../../db/models/Group';
import Role from '../../db/models/Role';
import User from '../../db/models/User';
import History from '../../db/models/History';
import { formPage, addHistory, setLimit } from './helper-functions';

/**
 * Get user list.
 * @returns {User[]}
 */
const list = async (req, res) => {

  const users = await
    User.find({})
        .populate({ path: 'role', model: Role })
        .populate({ path: 'group', model: Group });

  if (users) {
    res.json(users);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**
 * Get user
 * @requires {objectId} id: req.params.id
 * @returns {User}
 */
const get = async (req, res) => {

  const user = await
    User.findOne({ _id: req.params.id })
        .populate({ path: 'role', model: Role })
        .populate({ path: 'group', model: Group });

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }

};

/**Get one page of users
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
const page = async (req, res) => {

  const users = await
    User.find({})
        .sort({ surname: 'asc' });

  if (users) {
    const page = await formPage(req.headers.page, req.headers.limit, users);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**Find users by group id
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {objectId} id: req.params.id
 */
const group = async (req, res) => {
  const users = await User.find({ group: req.params.id })
                          .sort({ surname: 'asc' });

  if (users) {
    const page = await formPage(req.headers.page, req.headers.limit, users);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**Find users by branch id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
const branch = async (req, res) => {

  const users = await
    User.find({ group: req.params.id })
        .sort({ surname: 'asc' });

  if (users) {
    const page = await formPage(req.headers.page, req.headers.limit, users);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

/**Find users by query, by name or email
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
const search = async (req, res) => {

  const users = await User.find({
    $or: [
      { name: req.headers.search },
      { surname: req.headers.search },
      { email: req.headers.search }
    ]
  }).sort({ surname: 'asc' });

  if (users) {
    const page = await formPage(req.headers.page, req.headers.limit, users);
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
const update = async (req, res) => {

  const data = {
    group: req.headers.group,
    branch: req.headers.branch,
    role: req.headers.role,
    status: req.headers.status
  };

  const user = await
    User.findOneAndUpdate({ _id: req.params.id }, { $set: data }, { new: true });

  if (user) {

    //add information about changes in history
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
const history = async (req, res) => {

  const limit = setLimit(req.headers.months);

  const records = await
    History.find({ created: { $gt: limit }, targetId: req.params.id })
           .populate({ path: 'author', model: User })
           .sort({ created: '-1' });

  if (records) {
    const page = await formPage(req.headers.page, req.headers.limit, records);
    res.json(page);
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }


};


export { list, get, page, group, branch, search, update, history };

