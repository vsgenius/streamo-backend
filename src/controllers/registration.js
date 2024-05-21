const { MAX_AGE } = require('../utils/const');
const userReqistration = require('../services/user/registration');

async function registration(req, res) {
  try {
    const { email, password } = req.body;
    const userData = await userReqistration(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
    return res.json(userData);
  } catch (e) {
    return res.json({ error: 'ошибка регистрации' });
  }
}

module.exports = registration;
