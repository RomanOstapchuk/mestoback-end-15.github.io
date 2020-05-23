/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const Unauthorize = require('../errors/unautorize');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  const UnauthorizeError = new Unauthorize('Нужно войти в систему');

  if (!token) {
    return res.status(UnauthorizeError.statusCode || 500)
      .send({ message: UnauthorizeError.message });
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SOME-SECRET-KEY');
  } catch (err) {
    return res.status(UnauthorizeError.statusCode || 500)
      .send({ message: UnauthorizeError.message });
  }


  req.user = payload;
  next();
};
