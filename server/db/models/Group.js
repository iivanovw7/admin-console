const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, required: false, default: false },
  description: { type: String, required: true },
  permissions: { type: Boolean, required: false, default: false}
});

module.exports = mongoose.model('Group', groupSchema, 'groups');