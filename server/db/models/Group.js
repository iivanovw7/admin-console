import mongoose from 'mongoose';

const groupSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, required: false, default: false },
  description: { type: String, required: true },
  permissions: { type: Boolean, required: false, default: false}
});

export default  mongoose.model('Group', groupSchema, 'groups');