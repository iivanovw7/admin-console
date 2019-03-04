const express = require('express');
const app = express();
const port = process.env.PORT || 7465;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Login = process.env.DATABASE;
const Models = require('./db/models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up app to listen Port
app.listen(port, () => console.log(`Listening on port ${port}`));



mongoose.connect(Login, {useNewUrlParser: true}, (err) => {

  if (err) {
    console.log(err);
  } else {
    console.log(
      `dbRoot: ${Login}`
    );
    console.log('Connected');
  }

});



//Rendering production build
const path = require('path');

app.use(express.static(__dirname + './../dist'));

app.use(['/'], (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html')), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  }
});
