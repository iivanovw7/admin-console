const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  fax: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  information: { type: String, required: true },
  status: { type: Boolean, required: true }
});

module.exports = mongoose.model('Branch', BranchSchema, 'branches');
