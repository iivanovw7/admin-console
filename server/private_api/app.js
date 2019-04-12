import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { routes } from './app-routes';
import './config/passport.config.js';
import cors from 'cors';

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(allowCrossDomain);

app.use(allowCrossDomain);

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
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

/** mount all routes on "/api" path */
app.use('/api', routes);


export { app };






