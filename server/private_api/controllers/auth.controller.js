const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
const httpStatus = require('http-status');
const { tempUser, authRoles } = require('../config/param-auth');
const APIError = require('../api-error');

//function returns status of current user
function getStatus(role) {
  return (
    Role.findOne({_id : role})
      .exec()
      .then(role => {
        return checkStatus(role.code);
      })
  );
}

//function checks if user status belongs to current access list
function checkStatus(role) {
  for (const auth of authRoles) {
    if (auth === role) {
      return true;
    }
  }
  return false;
}

//function checks password and user group and returns
//user data if everything is good
function login(req, res, next) {
  console.log(req.body.email);
  User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if (user) {
          getStatus(user.role)
            .then(result => {
              if (result) {
                if (getStatus(user.role)) {
                  if (req.body.password === tempUser.password) {
                    console.log(user);
                    return res.status(200).json({
                      success: 'Success',
                      name: user.name,
                      surname: user.surname,
                      email: user.email,
                      created: user.created,
                      status: true,
                    });
                  } else {
                    const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
                    return next(err);
                  }
                }
              } else {
                const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
                return next(err);
              }
            });
        } else {
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
          return next(err);
        }
      });
}

module.exports = { login };
