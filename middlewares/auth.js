/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { KEY } = require('../config');
const Unauthorize = require('../errors/unautorize');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) throw new Unauthorize('Нужно войти в систему')

  try {
    payload = jwt.verify(token, KEY);
  } catch (err) {
    next(new Unauthorize('Нужно войти в систему'));
  }



  req.user = payload;
  next();
};
