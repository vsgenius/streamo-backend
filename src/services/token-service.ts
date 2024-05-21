import jwt from 'jsonwebtoken';

const tokenModel = require('../models/token-model');

class TokenServise {
  static generateToken(payload: any) {
    if (!process.env.JWT_ACCESS || !process.env.JWT_ACCESS_REFRESH) return { error: 'Ошибка генерации токена' };
    const token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_REFRESH, { expiresIn: '30d' });
    return { token, refreshToken };
  }

  static async save(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenServise();
