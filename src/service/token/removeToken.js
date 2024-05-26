const tokenModel = require('../../models/token-model');

async function removeToken(refreshToken) {
  const token = await tokenModel.deleteOne({ refreshToken });
  return token;
}

module.exports = removeToken;
