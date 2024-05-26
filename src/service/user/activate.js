const UserModel = require('../../models/user-model');
const ApiError = require('../../errors/api-error');

async function activate(activateLink) {
  const user = await UserModel.findOne({ activateLink });
  if (!user) {
    throw ApiError.BadRequest('Ссылка не активна');
  }
  user.isActivate = true;
  await user.save();
}

module.exports = activate;
