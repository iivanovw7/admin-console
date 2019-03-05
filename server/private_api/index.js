const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(
  () => {
    console.log('Connected');
  },
  err => {
    console.log(err);
  }
);

// Import all our models
require('../db/models/branch');
require('../db/models/group');
require('../db/models/message');
require('../db/models/role');
require('../db/models/ticket');
require('../db/models/user');

// Start our app!
const app = require('./app');

app.set('port', process.env.PORT || 7465);

const server = app.listen(app.get('port'),
  () => {
    console.log(
      `Private api is available on port ${server.address().port}`
    );
  }
);











