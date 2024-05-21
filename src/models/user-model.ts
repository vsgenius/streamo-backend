import { Schema, model } from 'mongoose';

type UserType = {
  name: string;
  email: string;
  password: string;
  isActivate: boolean;
  isAdmin: boolean;
  activateLink: string;
};

const userSchema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActivate: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  activateLink: { type: String, require: true },
});

module.exports = model('User', userSchema);
