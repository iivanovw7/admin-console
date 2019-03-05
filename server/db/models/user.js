const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  branch: { type: String, required: true },
  group: { type: String, required: true },
  created: { type: Date, required: false, default: Date.now },
  status: { type: Boolean, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema, 'users');
