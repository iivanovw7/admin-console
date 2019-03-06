const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
const httpStatus = require('http-status');
const { authRoles } = require('../config/param-auth');
const APIError = require('../api-error');

//function checks if user status belongs to current access list
function checkStatus(role) {
  for (const auth of authRoles) {
    if (auth === role) {
      return true;
    }
  }
  return new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
}

//function checks password and user group and returns
//user data if everything is good
async function login(req, res, next) {
  console.log(req.body.email);

  try {

    let user = await User.findOne({ email: req.body.email })
                         .populate({ path: 'role', model: Role });

    if (checkStatus(user.role.code)) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch) {
          console.log(user);
          return res.status(200).json({
            success: 'Success',
            name: user.name,
            surname: user.surname,
            email: user.email,
            created: user.created,
            status: true
          });
        } else {
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
          return next(err);
        }
      });
    }

  } catch {
    const err = new APIError('User not found', httpStatus.NOT_FOUND, true);
    return next(err);
  }
}


module.exports = { login };

