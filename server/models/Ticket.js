import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({

  authorId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  branchId: { type: mongoose.Schema.ObjectId, ref: 'Branch' },
  message: { type: String, required: true },
  note: String,
  subject: String,
  status: String,
  created: { type: Date, default: Date.now },
  closed: Date
});

export default mongoose.model('Ticket', ticketSchema, 'tickets');