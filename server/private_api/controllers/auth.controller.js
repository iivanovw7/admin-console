const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
const httpStatus = require('http-status');
const { authRoles } = require('../config/param-auth');


//function checks if user status belongs to current access list
function checkStatus(user) {
  for (const auth of authRoles) {
    if (auth === user.role.code) {
      return true;
    }
  }
  return false;
}

//function checks password and user group and returns
//user data if everything is good
// .orFail(new Error('No docs found!'))
function login(req, res) {

  User.findOne({ email: req.body.email })
      .populate({ path: 'role', model: Role })
      .then(user => {
        if (checkStatus(user)) {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch) {
              res.status(200).json({
                user
              });
            } else {
              res.send(httpStatus.UNAUTHORIZED);
            }
          });
        } else {
          res.send(httpStatus.UNAUTHORIZED);
        }
      })
      .catch(err =>
        res.send(httpStatus.NOT_FOUND)
      );

}

module.exports = { login };


