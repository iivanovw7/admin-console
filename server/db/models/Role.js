import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },
  public: { type: Boolean, default: false }, //accessible from public API
  editable: { type: Boolean, default: false } //can be blocked by users
});

export default mongoose.model('Role', roleSchema, 'roles');