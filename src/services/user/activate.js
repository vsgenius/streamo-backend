const UserModel = require('../../models/user-model');

async function activate(activateLink) {
  const user = await UserModel.findOne({ activateLink });
  if (!user) {
    throw new Error('Ссылка не активна');
  }
  user.isActivate = true;
  await user.save();
}

module.exports = activate;
