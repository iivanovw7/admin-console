import passport from 'passport';
import PassportLocal from 'passport-local';
import Role from '../../models/Role';
import User from '../../models/User';
import { authRoles } from './constants.config';
import { ifArrayContains } from '../helper-functions';

const LocalStrategy = PassportLocal.Strategy;

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
          if (!user || !ifArrayContains(user.role.code, authRoles)) {
            //console.log('Authentication error');
            return done(null, false);
          }
          user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
              //console.log('Authentication successful!');
              done(null, user);
            } else {
              //console.log('Wrong password!');
              done(null, false);
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


