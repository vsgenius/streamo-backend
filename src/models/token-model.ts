import { Schema, Types, model } from 'mongoose';

type TokenType = {
  user: Types.ObjectId;
  refreshToken: string;

};

const TokenSchema = new Schema<TokenType>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

module.exports = model('Token', TokenSchema);
