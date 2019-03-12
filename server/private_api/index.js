import mongoose from 'mongoose';
import { app } from './app';

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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











