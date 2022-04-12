const express = require('express');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// фиксированный _id пользователя
app.use((req, res, next) => {
  req.user = {
    id: '62500f4c0f9b040848b94841',
  };
  next();
});

// роуты
app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
