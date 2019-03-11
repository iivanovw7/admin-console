const passport = require('passport');

const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


/** Authentication handling,
 * according to parameters in auth.passport.js
 *
 * @param req
 * @param res
 * @param next
 */
function login(req, res, next) {

  catchErrors(
    passport.authenticate('local', { session: true }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/users');
      });
    })(req, res, next)
  );

}


function logout(req, res) {
  req.logout();
  console.log('User logged out');
  res.redirect('/login');
}

module.exports = { login, logout };


