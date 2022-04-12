const Card = require('../models/card');

const { ERROR_CODE_REQUEST, ERROR_CODE_NOTFOUND, ERROR_CODE_DEFAULT } = require('../utils/constants');

// создание карточки
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ cardID: card._id }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

// все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

// удаление карточки
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

// поставить лайк
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

// убрать лайк
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Передан несуществующий _id карточки' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};
