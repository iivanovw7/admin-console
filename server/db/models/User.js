const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: false },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  branch: { type: String, required: false },
  group: { type: String, required: false },
  created: { type: Date, required: false, default: Date.now },
  status: { type: Boolean, required: false },
  role: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema, 'users');
