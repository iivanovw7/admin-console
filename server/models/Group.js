import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, default: false },
  description: { type: String, required: true },
  permissions: { type: Boolean, default: false }
});

export default mongoose.model('Group', groupSchema, 'groups');