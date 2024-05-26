const ApiError = require('../errors/api-error');
const validateToken = require('../service/token/validateToken');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnAuthorizedError());
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(ApiError.UnAuthorizedError());
    }
    const userData = validateToken(token, process.env.JWT_ACCESS);
    if (!userData) {
      return next(ApiError.UnAuthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnAuthorizedError());
  }
};
