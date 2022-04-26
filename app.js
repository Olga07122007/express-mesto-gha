const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');

const { createUserValidation, loginValidation } = require('./middlewares/validatons');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роуты, не требующие авторизации
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

// роуты, которым нужна авторизация
app.use(auth, cardsRouter);
app.use(auth, usersRouter);

app.use('/*', () => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});

// обработчик ошибок celebrate
app.use(errors());

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
