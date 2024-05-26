const bcrypt = require('bcrypt');

const mailService = require('../mail/mail-service');
const UserModel = require('../../models/user-model');
const TokenModel = require('../../models/token-model');
const generateToken = require('../token/generateToken');
const saveToken = require('../token/save');
const ApiError = require('../../errors/api-error');

async function login(email, password) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequest(`Пользователь с таким ${email} не найден`);
  }
  if (!user.isActivate) {
    await mailService.sendActivateMail(email, `${process.env.API_URL}/api/activate/${user.activateLink}`);
    throw ApiError.BadRequest(`Пользователь ${email} не активирован. Ссылка направлена повторно`);
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest('Логин или пароль введены не корректно');
  }
  const tokens = generateToken({
    id: user._id,
    email: user.email,
    isActivate: user.isActivate,
  });
  const token = await TokenModel.findOne({ 'user.id': user._id });
  if (!token) {
    await saveToken(user._id, tokens.refreshToken);
  }
  return {
    ...tokens,
    user: {
      id: user._id,
      email: user.email,
      isActivate: user.isActivate,
    },
  };
}

module.exports = login;
