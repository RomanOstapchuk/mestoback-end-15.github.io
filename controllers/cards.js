const NotFoundError = require('../errors/notfounderror');
const Forbidden = require('../errors/forbid');
const cardModel = require('../models/card.js');

module.exports.getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  cardModel.findById({ _id: id })
    .orFail(() => new NotFoundError('Нет такой карточки'))
    .then(() => Card.findOneAndDelete({ $and: [{ _id: id }, { owner: req.user._id }] })
      .orFail(() => new Forbidden('Недостаточно прав'))
      .then((card) => {
        res.status(200).send(card);
      }))
    .catch(next);
};
