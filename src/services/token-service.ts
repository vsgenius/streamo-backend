import jwt from 'jsonwebtoken';
const tokenModel = require('../models/token-model');

class TokenServise {
    generateToken(payload: any) {
        if (!process.env.JWT_ACCESS || !process.env.JWT_ACCESS_REFRESH) return;
      const token = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn:'1h'});
      const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_REFRESH, {expiresIn:'30d'});
      return {
        token,
        refreshToken
        };
    }
    async save(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }
}

module.exports = new TokenServise();