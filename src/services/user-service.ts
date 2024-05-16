const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/user-model');

const mailService = require('./mail-service');
const tokenServise = require('./token-service');

class UserService {
  static async registration(email:string, password:string) {
    const user = await UserModel.findOne({ email });
    if (user) {
      return { status: 'error', text: `Пользователь с почтовым адресом ${email} уже существует` };
    }
    const passwordHash = await bcrypt.hash(password, 3);
    const activateLink = uuid.v4();
    const newUser = await UserModel.create({ email, password: passwordHash, activateLink });
    await mailService.sendActivateMail(email, `${process.env.API_URL}/api/activate/${activateLink}`);
    const tokens = tokenServise.generateToken({
      id: newUser._id,
      email: newUser.email,
      isActivate: newUser.isActivate,
    });
    await tokenServise.save(newUser._id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        id: newUser._id,
        email: newUser.email,
        isActivate: newUser.isActivate,
      },
    };
  }

  static async activate(activateLink: string) {
    const user = await UserModel.findOne({ activateLink });
    if (!user) {
      throw new Error('Ссылка не активна');
    }
    user.isActivate = true;
    await user.save();
  }
}

module.exports = new UserService();
