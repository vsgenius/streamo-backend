const userLogin = require('../../service/user/login');
const MAX_AGE = require('../../utils/const');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const userData = await userLogin(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

module.exports = login;
