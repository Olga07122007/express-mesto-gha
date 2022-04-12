const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

// бд
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb');

// парсер
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// фиксированный _id пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '62500f4c0f9b040848b94841',
  };
  next();
});

// роуты
app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
