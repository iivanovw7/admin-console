const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: false },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  branch: { type: String, required: false },
  group: { type: String, required: false },
  created: { type: Date, required: false, default: Date.now },
  status: { type: Boolean, required: false },
  role: { type: String, required: true }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema, 'users');
