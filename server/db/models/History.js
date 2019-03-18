import mongoose from 'mongoose';

const historySchema = mongoose.Schema({
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  targetModel: { type: String, required: false },
  targetId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  actionType: { type: String, required: false },
  created: { type: Date, required: false, default: Date.now },
  target: {}
});

export default mongoose.model('History', historySchema, 'history');
