const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
  name: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  fax: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  information: { type: String, required: false },
  status: { type: Boolean, required: false, default: false }
});

module.exports = mongoose.model('Branch', branchSchema, 'branches');
