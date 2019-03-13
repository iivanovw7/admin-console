import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
  authorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: false },
  branchId: { type: mongoose.Schema.ObjectId, ref: 'Branch', required: false},
  message: { type: String, required: true },
  note: { type: String, required: false },
  subject: { type: String, required: false },
  status: { type: String, required: false, default: false },
  created: { type: Date, required: false, default: Date.now },
  closed: { type: Date, required: false }
});

export default mongoose.model('Ticket', ticketSchema, 'tickets');