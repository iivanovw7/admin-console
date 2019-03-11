const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
const httpStatus = require('http-status');

const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * Function forms one page of objects out of incoming list of objects
 * no mater what list it got in parameters
 *
 * @param currPage: {number}, current page number
 * @param currLimit: {number}, number of elements for one page
 * @param list: {[]}, array of objects
 * @param elements: {number}, total count of elements
 *
 * @returns {Promise.<void>}
 */
const formPage =
  async (currPage = 1,
         currLimit = 10,
         list = [],
         elements = 0) => {

    //needed to keep input numbers inside certain limits
    //in order to prevent unpredicted outputs
    Number.prototype.limited = function (min, max) {
      return Math.min(Math.max(this, min), max);
    };

    //applying limits of elements for one page
    const limit = currLimit.limited(1, 25);
    //applying limits for maximum page number value
    const pages = Math.ceil(elements / limit);
    //applying limits for input pageNumber value
    const page = currPage.limited(1, pages);

    const skipped = (page * limit) - limit;
    const output = list.slice(skipped, skipped + limit);

    return {
      page,
      limit,
      pages,
      output
    };
  };


/**
 * Get user list.
 * @returns {User[]}
 */
function list(req, res, next) {
  catchErrors(
    User.find({})
        .populate({ path: 'role', model: Role })
        .then(users => {
          res.json(
            [
              { Total: users.length },
              users
            ]
          );
        })
  );
}

/**
 * Get user
 * @requires {objectId} id: req.params.id
 * @returns {User}
 */
function get(req, res, next) {
  catchErrors(
    User.findOne({ _id: req.params.id })
        .populate({ path: 'role', model: Role })
        .then(user => {
          if (!user) {
            return res.send(httpStatus.NOT_FOUND);
          }
          return res.json(user);
        })
        .catch(e => next(e))
  );
}

/**Get one page of users
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
function page(req, res, next) {
  catchErrors(
    User.find({})
        .sort({ surname: 'asc' })
        .then(users => {
          formPage(
            req.headers.page,
            req.headers.limit,
            users,
            users.length
          ).then(page =>
            res.json({
              page
            })
          ).catch(e => next(e));
        })
  );
}

/**Find users by group id
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {objectId} id: req.params.id
 */
function group(req, res, next) {
  catchErrors(
    User.find({ group: req.params.id })
        .sort({ surname: 'asc' })
        .then(users => {
          formPage(
            req.headers.page,
            req.headers.limit,
            users,
            users.length
          ).then(page =>
            res.json({
              page
            })
          ).catch(e => next(e));
        })
  );
}

/**Find users by branch id
 *
 * @requires {objectId} id: req.params.id
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
function branch(req, res, next) {
  catchErrors(
    User.find({ branch: req.params.id })
        .sort({ surname: 'asc' })
        .then(users => {
          formPage(
            req.headers.page,
            req.headers.limit,
            users,
            users.length
          ).then(page =>
            res.json({
              page
            })
          ).catch(e => next(e));
        })
  );
}

/**Find users by query, by name or email
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 * @requires {string} search: req.headers.search
 */
function search(req, res, next) {
  catchErrors(
    User.find({
      $or:
        [
          { name: req.headers.search },
          { surname: req.headers.search },
          { email: req.headers.search }
        ]
    })
        .sort({ surname: 'asc' })
        .then(users => {
          formPage(
            req.headers.page,
            req.headers.limit,
            users,
            users.length
          ).then(page =>
            res.json({
              page
            })
          ).catch(e => next(e));
        })
  );
}

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
function update(req, res, next) {

  const data = {
    group: req.headers.group,
    branch: req.headers.branch,
    role: req.headers.role,
    status: req.headers.status
  };

  catchErrors(
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true })
        .then(updatedUser =>
          res.status(200).json({
            updatedUser
          }))
        .catch(e => next(e))
  );
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {

  catchErrors(
    User.findByIdAndRemove(
      { _id: req.params.id })
        .then(removedUser =>
          res.status(200).json({
            removedUser
          }))
        .catch(e => next(e))
  );

}


module.exports = { list, get, page, group, branch, search, update, remove };

