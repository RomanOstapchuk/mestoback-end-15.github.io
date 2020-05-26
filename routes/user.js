const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUsers, findUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id',
celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}),
findUser);

module.exports = userRouter;
