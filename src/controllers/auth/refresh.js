const userRefresh = require('../../service/user/refresh');
const MAX_AGE = require('../../utils/const');

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userRefresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

module.exports = refresh;
