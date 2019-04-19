import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { routes } from './app-routes';
import './config/passport.config.js';
import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'http://localhost'];

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
//app.use(allowCrossDomain);

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






