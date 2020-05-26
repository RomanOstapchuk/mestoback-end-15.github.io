const cardRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}),
createCard);
cardRouter.delete('/:id',
celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}),
deleteCard);

module.exports = cardRouter;
