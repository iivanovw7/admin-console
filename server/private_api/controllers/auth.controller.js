import passport from 'passport';
import httpStatus from 'http-status';


/** Authentication handling,
 * according to parameters in params-passport.js
 *
 * @param req
 * @param res
 * @param next
 */
const login = async (req, res, next) => {
  passport.authenticate('local', { session: true }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.sendStatus(httpStatus.OK);
      });
    }
  })(req, res, next);
};

const logout = async (req, res) => {
  req.logout();
  return res.sendStatus(httpStatus.OK);
};

// Used for handling protected routes
function isLoggedIn(request, response, next) {
  // passport adds this to the request object
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect('/login');
}

export { login, logout, isLoggedIn };


