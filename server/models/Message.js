import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  branchId: { type: mongoose.Schema.ObjectId, ref: 'Branch' },
  groupId: { type: mongoose.Schema.ObjectId, ref: 'Group' },
  senderId: String
});

export default mongoose.model('Message', messageSchema, 'messages');
