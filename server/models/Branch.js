import mongoose from 'mongoose';

const branchSchema = mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  fax: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  information: String,
  status: { type: Boolean, default: false }
});

export default mongoose.model('Branch', branchSchema, 'branches');
