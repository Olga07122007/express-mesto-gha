const User = require('../models/user');

const { ERROR_CODE_REQUEST, ERROR_CODE_NOTFOUND, ERROR_CODE_DEFAULT } = require('../utils/constants');

// все пользователи
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' }));
};

// один пользователь
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Некорректно указан _id пользователя' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

// создать пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновить профиль
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  if ((!about) || (!name)) {
    res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
    return;
  }
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Передан некорректный _id при обновлении профиля' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    return;
  }
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_REQUEST).send({ message: 'Передан некорректный _id при обновлении аватара' });
        return;
      }
      res.status(ERROR_CODE_DEFAULT).send({ message: 'На сервере произошла ошибка' });
    });
};
