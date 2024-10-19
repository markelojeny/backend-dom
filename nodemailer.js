const nodemailer = require('nodemailer');
const { OK } = require('./errors/error');

module.exports.SendUsMail = (req, res) => {
  const { fio, email, tel} = req.body;
  console.log(res.statusCode);

  let transporter = nodemailer.createTransport({
  host: 'smtp.masterhost.ru',
  port: 465,
  secure: true,
  auth: {
      user: 'anything@centre-2000.ru',
      pass: 'Fallcoming2024',
  },
  }, {
  from: '"Центр-2000" <anything@centre-2000.ru>',
  });

  transporter.sendMail(
    {
      to: `${email}, anything@centre-2000.ru`,
      subject: 'Продажа домов в Семидворье и Шаблыкино-Village',
      text:
        `Здравствуйте, ${fio}, спасибо за ваше обращение, мы перезвоним вам по указонному вами номеру телефона: ${tel}`,
      html:
        `Здравствуйте, ${fio}, спасибо за ваше обращение, мы перезвоним вам по указонному вами номеру телефона: ${tel}`,
    }, (err, info) => {
      if(res.status(OK)) {
        res.send('200');
        console.log('Email sent: ', info)
      } else {
          console.log(err)
      }
    }
  )
}