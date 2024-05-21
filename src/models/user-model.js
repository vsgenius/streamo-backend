const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActivate: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  activateLink: { type: String, require: true },
});

module.exports = model('User', userSchema);
