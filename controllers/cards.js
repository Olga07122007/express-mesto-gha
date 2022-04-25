const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');

const BadRequestError = require('../errors/BadRequestError');

const ForbiddenError = require('../errors/ForbiddenError');

// создание карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        throw new NotFoundError('Что-то пошло не так');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      next(err);
    });
};

// все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

// удаление карточки
module.exports.deleteCard = (req, res, next) => {
  const ownerId = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        if (!card.owner.equals(ownerId)) {
          throw new ForbiddenError('Чужая карточка не может быть удалена!');
        }
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            res.status(200).send({ data: card });
          });
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка с указанным _id не найдена'));
      }
      next(err);
    });
};

// поставить лайк
module.exports.likeCard = (req, res, next) => {
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
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id карточки'));
      }
      next(err);
    });
};

// убрать лайк
module.exports.dislikeCard = (req, res, next) => {
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
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный _id карточки'));
      }
      next(err);
    });
};
