const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, required: false, default: Date.now },
  branchId: { type: String, required: true },
  groupId: { type: String, required: true },
  senderId: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema, 'messages');