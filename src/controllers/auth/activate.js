const userActivate = require('../../service/user/activate');

async function activate(req, res, next) {
  try {
    const activateLink = req.params.link;
    await userActivate(activateLink);
    if (process.env.CLIENT_URL) return res.redirect(process.env.CLIENT_URL);
    return res.json({ error: 'ошибка переадресации' });
  } catch (e) {
    next(e);
  }
}

module.exports = activate;
