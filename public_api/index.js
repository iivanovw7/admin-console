const express = require('express');
const app = express();
const port = process.env.PORT_PUBLIC || 6465;
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up app to listen Port
app.listen(port, () => console.log(`Public api is available on port ${port}`));







