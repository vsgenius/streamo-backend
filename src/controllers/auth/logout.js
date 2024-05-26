const userLogout = require('../../service/user/logout');

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const token = await userLogout(refreshToken);
    res.clearCookie('refreshToken');
    return res.json({ token });
  } catch (e) {
    next(e);
  }
}

module.exports = logout;
