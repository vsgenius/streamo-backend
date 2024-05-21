const jwt = require('jsonwebtoken');

function generateToken(payload) {
  if (!process.env.JWT_ACCESS || !process.env.JWT_ACCESS_REFRESH) return { error: 'Ошибка генерации токена' };
  const token = jwt.sign(payload, process.env.JWT_ACCESS, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_REFRESH, { expiresIn: '30d' });
  return { token, refreshToken };
}

module.exports = generateToken;
