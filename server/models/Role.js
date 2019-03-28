import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  active: { type: Boolean, required: true },

  //TODO: evaluate another way of blocking role access from public api, excluding DB
  //accessible from public API
  public: { type: Boolean, default: false },

  //TODO: evaluate another way of blocking role access from public api, excluding DB
  //can be blocked by users
  editable: { type: Boolean, default: false }
});

export default mongoose.model('Role', roleSchema, 'roles');