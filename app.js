require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { PORT, DATABASE_URL } = require('./config.js');

const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const usersrouter = require('./routes/user');

const cardsrouter = require('./routes/cards');


const app = express();

app.use(helmet());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', usersrouter);
app.use('/cards', cardsrouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
});

app.listen(PORT);
