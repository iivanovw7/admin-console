const User = require('../../db/models/User');
const httpStatus = require('http-status');
const APIError = require('../api-error');

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function list(req, res, next) {
  console.log('Getting users from API...');
  try {
    const users = await User.find({});
    res.json(users);
  } catch {
    const err = new APIError('Nothing found', httpStatus.NOT_FOUND, true);
    return next(err);
  }
}


//TODO :
// /**
//  * Load user and append to req.
//  */
// function load(req, res, next, id) {
//   user.get(id)
//       .then((user) => {
//         req.user = user; // eslint-disable-line no-param-reassign
//         return next();
//       })
//       .catch(e => next(e));
// }
//
// /**
//  * Get user
//  * @returns {User}
//  */
// function get(req, res) {
//   return res.json(req.user);
// }
//
// /**
//  * Create new user
//  * @property {string} req.body.username - The username of user.
//  * @property {string} req.body.mobileNumber - The mobileNumber of user.
//  * @returns {User}
//  */
// function create(req, res, next) {
//   const user = new User({
//     username: req.body.username,
//     mobileNumber: req.body.mobileNumber
//   });
//
//   user.save()
//       .then(savedUser => res.json(savedUser))
//       .catch(e => next(e));
// }
//
// /**
//  * Update existing user
//  * @property {string} req.body.username - The username of user.
//  * @property {string} req.body.mobileNumber - The mobileNumber of user.
//  * @returns {User}
//  */
// function update(req, res, next) {
//   const user = req.user;
//   user.username = req.body.username;
//   user.mobileNumber = req.body.mobileNumber;
//
//   user.save()
//       .then(savedUser => res.json(savedUser))
//       .catch(e => next(e));
// }
//
// /**
//  * Delete user.
//  * @returns {User}
//  */
// function remove(req, res, next) {
//   const user = req.user;
//   user.remove()
//       .then(deletedUser => res.json(deletedUser))
//       .catch(e => next(e));
// }

module.exports = { list };

