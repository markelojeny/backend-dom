const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const router = require('express').Router();
const { SendUsMail } = require('./nodemailer');

router.post('/semidvorie', SendUsMail);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

const app = express();

app.use(express.json());
app.use(helmet());


const { PORT = 3001 } = process.env;

const allowedCors = [
    'http://localhost:3000',
    'https://centre2000-houses.ru',
    'https://centre2000-houses.ru/',
    'https://centre2000-houses.ru/semidvorie',
    'https://centre2000-houses.ru/shablykino-village',
    'http://centre2000-houses.ru',
    'http://centre2000-houses.ru/',
    'http://centre2000-houses.ru/semidvorie',
    'http://centre2000-houses.ru/shablykino-village'
];

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://centre2000-houses.ru',
    'http://centre2000-houses.ru',
    'http://centre2000-houses.ru/',
    'http://centre2000-houses.ru/semidvorie',
    'http://centre2000-houses.ru/shablykino-village'
  ],
  exposedHeaders: 'Access-Control-Allow-Origin',
  credentials: true,
}));

app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.use(router);

app.listen(PORT, () => {

  // eslint-disable-next-line no-console 127.0.0.1
  console.log(`App listening on ${PORT} port`);

});