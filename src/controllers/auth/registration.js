const { validationResult } = require('express-validator');

const userReqistration = require('../../service/user/registration');
const { MAX_AGE } = require('../../utils/const');
const ApiError = require('../../errors/api-error');

async function registration(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка валидации', errors));
    }
    const { email, password } = req.body;
    const userData = await userReqistration(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: MAX_AGE, httpOnly: true });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
}

module.exports = registration;
