const userActivate = require('../services/user/activate');

async function activate(req, res) {
  try {
    const activateLink = req.params.link;
    await userActivate(activateLink);
    if (process.env.CLIENT_URL) return res.redirect(process.env.CLIENT_URL);
    return res.json({ error: 'ошибка переадресации' });
  } catch (e) {
    return res.json({ error: 'ошибка активации' });
  }
}

module.exports = activate;
