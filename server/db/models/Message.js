import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, required: false, default: Date.now },
  branchId: { type: mongoose.Schema.ObjectId, ref: 'Branch', required: false },
  groupId: { type: mongoose.Schema.ObjectId, ref: 'Group', required: false },
  senderId: { type: String, required: false }
});

export default mongoose.model('Message', messageSchema, 'messages');