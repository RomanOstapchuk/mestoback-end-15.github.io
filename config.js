module.exports.PORT = process.env.PORT || 3000;
module.exports.DATABASE_URL = 'mongodb://localhost:27017/mestodb';
module.exports.KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'SOME-SECRET-KEY';
