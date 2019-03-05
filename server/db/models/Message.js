const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, required: false, default: Date.now },
  branchId: { type: String, required: false },
  groupId: { type: String, required: false },
  senderId: { type: String, required: false }
});

module.exports = mongoose.model('Message', messageSchema, 'messages');