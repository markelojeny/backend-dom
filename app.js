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

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://centre2000-houses.online',
    'http://centre2000-houses.ru'
  ],
  exposedHeaders: 'Access-Control-Allow-Origin',
  credentials: true,
}));

app.use(router);

app.listen(PORT, () => {

  // eslint-disable-next-line no-console 127.0.0.1
  console.log(`App listening on ${PORT} port`);

});