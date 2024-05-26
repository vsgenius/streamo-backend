const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../../models/user-model');
const mailService = require('../mail/mail-service');
const generateToken = require('../token/generateToken');
const saveToken = require('../token/save');
const ApiError = require('../../errors/api-error');

async function registration(email, password) {
  const user = await UserModel.findOne({ email });
  if (user) {
    throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
  }
  const passwordHash = await bcrypt.hash(password, 3);
  const activateLink = uuid.v4();
  await mailService.sendActivateMail(email, `${process.env.API_URL}/api/activate/${activateLink}`);
  const newUser = await UserModel.create({ email, password: passwordHash, activateLink });
  const tokens = generateToken({
    id: newUser._id,
    email: newUser.email,
    isActivate: newUser.isActivate,
  });
  await saveToken(newUser._id, tokens.refreshToken);
  return {
    ...tokens,
    user: {
      id: newUser._id,
      email: newUser.email,
      isActivate: newUser.isActivate,
    },
  };
}

module.exports = registration;
