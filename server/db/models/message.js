const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, required: true }

});

module.exports = mongoose.model('Message', messageSchema, 'messages');