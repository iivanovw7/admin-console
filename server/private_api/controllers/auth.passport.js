import passport from 'passport';
import PassportLocal from 'passport-local';
import Role from '../../db/models/Role';
import User from '../../db/models/User';
import { authRoles } from '../config/param-auth';

const LocalStrategy = PassportLocal.Strategy;

//function checks if user status belongs to current access list
function checkStatus(user) {
  for (const auth of authRoles) {
    if (auth === user.role.code) {
      return true;
    }
  }
  return false;
}

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallBack: true
  },

  function (email, password, done) {
    User.findOne({ email: email })
        .populate({ path: 'role', model: Role })
        .then(user => {
          if (!user || !checkStatus(user)) {
            console.log('Authenticated error');
            return done(null, false, { message: 'Incorrect username.' });
          }
          user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
              console.log('correct');
              done(null, user);
            } else {
              console.log('wrong password');
              done(null, false, { message: 'Invalid username/password' });
            }
          });
        })
        .catch(err => {
          return done(err);
        });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


/**
 *  Used for handling protected routes
 */
export function isLoggedIn(request, response, next) {
  // passport adds this to the request object
  if (request.isAuthenticated()) {
    return next();
  }
  response.redirect('/login');
};