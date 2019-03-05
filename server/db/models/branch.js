const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  fax: { type: String, required: true },
  address: { type: String, required: true },
  information: { type: String, required: true },
  status: { type: Boolean, required: true }

});

module.exports = mongoose.model('Branch', branchSchema, 'branches');
