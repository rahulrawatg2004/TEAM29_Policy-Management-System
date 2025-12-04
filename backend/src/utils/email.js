const nodemailer = require('nodemailer');

const transporter = process.env.EMAIL_HOST ? nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}) : null;

async function send(to, subject, text) {
  if (!transporter) {
    console.log([EMAIL STUB] to=${to} subject=${subject} text=${text});
    return;
  }
  return transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
}

module.exports = { send };