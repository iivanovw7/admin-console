const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  message: { type: String, required: true },
  note: { type: String, required: true },
  status: { type: String, required: true },
  created: { type: Date, required: true }

});

module.exports = mongoose.model('Ticket', ticketSchema, 'tickets');