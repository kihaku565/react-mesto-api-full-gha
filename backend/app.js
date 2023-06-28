require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 1000 запросов с одного IP
});

const app = express();

app.use(cors());

app.use(helmet()); // настраиваем заголовки

app.use(express.json()); // для собирания JSON-формата

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter); // подключаем rate-limiter

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

mongoose.connect('mongodb://127.0.0.1/mestodb');

app.listen(PORT);
