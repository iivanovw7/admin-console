const express = require('express');
const app = express();
const port = process.env.PORT_STATIC || 9465;

//Setting up app to listen Port
app.listen(port, () => console.log(`Listening on port ${port}`));

//Rendering production build
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.use(['/'], (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html')), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  }
});