import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import RegisterTournamentEmail from './templates';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendRegisterTournamentEmail(email: string) {
  const emailHtml = await render(RegisterTournamentEmail());

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Successfully registered',
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
}
