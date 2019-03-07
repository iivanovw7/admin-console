const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const app = require('./app');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(
  () => {
    console.log('Connected');
  },
  err => {
    console.log(err);
  }
);

app.set('port', process.env.PORT_PRIVATE || 7425);

const server = app.listen(app.get('port'),
  () => {
    console.log(
      `Private api is available on port ${server.address().port}`
    );
  }
);










