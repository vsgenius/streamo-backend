const jwt = require('jsonwebtoken');

function validateToken(token, secret) {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (error) {
    return null;
  }
}

module.exports = validateToken;
