const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true }

});

module.exports = mongoose.model('Role', roleSchema, 'roles');