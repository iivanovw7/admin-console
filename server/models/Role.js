import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },

  //accessible from public API
  public: { type: Boolean, default: false },

  //can be blocked by users
  editable: { type: Boolean, default: false }
});

export default mongoose.model('Role', roleSchema, 'roles');