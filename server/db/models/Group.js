const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, required: false, default: false },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Group', groupSchema, 'groups');