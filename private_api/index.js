const express = require('express');
const app = express();
const port = process.env.PORT_PRIVATE || 7465;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Login = process.env.DATABASE;
const Models = require('./db/models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up app to listen Port
app.listen(port, () => console.log(`Private api is available on port ${port}`));


mongoose.connect(Login, {useNewUrlParser: true}).then(
  () => {
    console.log(
      `dbRoot: ${Login}`
    );
    console.log('Connected');
  },
  err => {
    console.log(err);
  }
);




