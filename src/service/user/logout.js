const removeToken = require('../token/removeToken');

async function logout(refreshToken) {
  const token = await removeToken(refreshToken);
  return token;
}

module.exports = logout;
