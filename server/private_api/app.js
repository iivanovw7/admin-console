import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { routes } from './app-routes';
import { isLoggedIn } from './controllers/auth.passport.js';

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express Session
app.use(session({
  secret: process.env.SECRET || 'secret',
  saveUninitialized: false,
  resave: true,
  rolling: true,
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const path = require('path');

/**
 * Temporary redirect to static login page
 *
 * TODO Remove after testing
 */
app.use(['/login'], (req, res) => {

  res.sendFile(path.join(__dirname, './login.html')), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  };
});

/**
 * Temporary redirect to static page
 * with Protected content
 *
 * TODO Remove after testing
 */
app.use(['/users'], isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, './users.html')), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  };
});

/**
 * mount all routes on "/api" path
 */
app.use('/api', routes);

export { app };






