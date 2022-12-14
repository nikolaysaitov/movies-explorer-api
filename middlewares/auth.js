const jwt = require('jsonwebtoken');
const AuthorisationError = require('../errors/authorisation_error_401');
const { secretKey } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthorisationError('Необходима авторизация'));
  }
  const token = authorization.replace(/^\S+/, '').trim();

  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new AuthorisationError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
