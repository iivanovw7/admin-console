const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Group', GroupSchema, 'groups');