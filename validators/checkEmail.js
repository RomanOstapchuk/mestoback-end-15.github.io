const validator = require('validator');

module.exports.checkEmail = (userEmail) => validator.isEmail(userEmail);
