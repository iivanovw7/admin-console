const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  message: { type: String, required: true },
  note: { type: String, required: true },
  status: { type: String, required: true },
  authorId: { type: String, required: true },
  branchId: { type: String, required: true },
  created: { type: Date, required: false, default: Date.now },
  closed: { type: Date, required: false }
});

module.exports = mongoose.model('Ticket', TicketSchema, 'tickets');