const { celebrate, Joi } = require('celebrate');

// создание пользователя
module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .regex(
        /^((http|https):\/\/)?(www\.)?([a-zа-я0-9]{1}[a-zа-я0-9-\\]*\.?)*\.{1}[a-zа-я0-9-]{2,8}(\w-\.~:\/?#\[\]@!$&'\(\)*\+,;=)?/i,
      ),
  }),
});

// логин
module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// обновить профиль
module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// обновить аватар
module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .regex(
        /^((http|https):\/\/)?(www\.)?([a-zа-я0-9]{1}[a-zа-я0-9-\\]*\.?)*\.{1}[a-zа-я0-9-]{2,8}(\w-\.~:\/?#\[\]@!$&'\(\)*\+,;=)?/i,
      ),
  }),
});

// id пользователя
module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

// создать карточку
module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .regex(
        /^((http|https):\/\/)?(www\.)?([a-zа-я0-9]{1}[a-zа-я0-9-\\]*\.?)*\.{1}[a-zа-я0-9-]{2,8}(\w-\.~:\/?#\[\]@!$&'\(\)*\+,;=)?/i,
      ),
  }),
});

// id карточки
module.exports.cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});
