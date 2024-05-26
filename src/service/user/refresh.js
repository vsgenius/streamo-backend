const validateToken = require('../token/validateToken');
const tokenModel = require('../../models/token-model');
const userModel = require('../../models/user-model');
const generateToken = require('../token/generateToken');
const saveToken = require('../token/save');
const ApiError = require('../../errors/api-error');

async function refresh(refreshToken) {
  if (!refreshToken) {
    throw ApiError.UnAuthorizedError();
  }
  const userData = validateToken(refreshToken, process.env.JWT_ACCESS_REFRESH);
  const tokenData = await tokenModel.findOne({ refreshToken });
  if (!tokenData || !userData) {
    throw ApiError.UnAuthorizedError();
  }
  const user = await userModel.findById(userData.id);

  const tokens = generateToken({
    id: user._id,
    email: user.email,
    isActivate: user.isActivate,
  });
  await saveToken(user._id, tokens.refreshToken);
  return {
    ...tokens,
    user: {
      id: user._id,
      email: user.email,
      isActivate: user.isActivate,
    },
  };
}

module.exports = refresh;
