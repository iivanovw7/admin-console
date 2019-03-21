import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({

  email: { type: String, required: true, unique: true },
  phone: String,
  password: String,
  name: { type: String, required: true },
  surname: { type: String, required: true },
  branch: { type: mongoose.Schema.ObjectId, ref: 'Branch' },
  group: { type: mongoose.Schema.ObjectId, ref: 'Group' },
  created: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
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

export default mongoose.model('User', userSchema, 'users');
