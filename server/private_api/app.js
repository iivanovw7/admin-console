const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app-routes');
const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount all routes on /api path
app.use('/api', routes);
module.exports = app;



