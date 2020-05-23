module.exports = class Unauthorize extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
