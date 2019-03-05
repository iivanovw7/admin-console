const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  branch: { type: String, required: true },
  group: { type: String, required: true },
  created: { type: Date, required: true },
  status: { type: Boolean, required: true },
  permissions: { type: String, required: false }

});

module.exports = mongoose.model('User', userSchema, 'users');
