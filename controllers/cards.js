const mongoose = require('mongoose');
const NotFoundError = require('../errors/notfounderror');
const Forbidden = require('../errors/forbid');
const cardModel = require('../models/card.js');

const { ObjectId } = mongoose.Types;

module.exports.getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!ObjectId.isValid(cardId)) {
    res.status(400).send({ message: 'Невалидный id' });
    return;
  }
  cardModel.findById(cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        new Forbidden('Отсутствует доступ');
      } else {
        cardModel.findByIdAndRemove(cardId)
          .then(() => res.status(200).send({ data: card }));
      }
    })
    .catch(next);
};
