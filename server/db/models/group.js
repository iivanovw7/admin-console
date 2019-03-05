const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  status: { type: Boolean, required: true },
  description: { type: String, required: true }

});

module.exports = mongoose.model('Group', groupSchema, 'groups');