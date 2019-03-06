const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true }
});

module.exports = mongoose.model('Role', roleSchema, 'roles');