const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  message: { type: String, required: true },
  note: { type: String, required: false },
  status: { type: String, required: false, default: false },
  authorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  branchId: { type: mongoose.Schema.ObjectId, ref: 'Branch', required: false},
  created: { type: Date, required: false, default: Date.now },
  closed: { type: Date, required: false }
});

module.exports = mongoose.model('Ticket', ticketSchema, 'tickets');