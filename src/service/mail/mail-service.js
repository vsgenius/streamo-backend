const nodemailer = require('nodemailer');

class MailServise {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendActivateMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Активация аккаунта для Стрима',
      text: 'Hello world?',
      html: `
                <div>
                    <h2>Для активации письма пройдите по ссылке</h2>
                    <a href="${link}">${link}</a>
                </div>
            `,
    });
  }
}

module.exports = new MailServise();
