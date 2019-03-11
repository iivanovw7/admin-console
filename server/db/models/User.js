const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: false },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  branch: { type: mongoose.Schema.ObjectId, ref: 'Branch', required: false },
  group: { type: mongoose.Schema.ObjectId, ref: 'Group', required: false },
  created: { type: Date, required: false, default: Date.now },
  status: { type: Boolean, required: false, default: false },
  role: { type: mongoose.Schema.ObjectId, ref: 'Role', required: true }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.plugin(passportLocalMongoose, {
  usernameField : 'email',
  passwordField: 'password',
});

module.exports = mongoose.model('User', userSchema, 'users');
