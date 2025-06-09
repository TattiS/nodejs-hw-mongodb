import nodemailer from 'nodemailer';
import { getEnvValue } from './getEnvValue.js';

const transport = nodemailer.createTransport({
  host: getEnvValue('SMTP_HOST'),
  port: getEnvValue('SMTP_PORT'),
  secure: false,
  auth: {
    user: getEnvValue('SMTP_USER'),
    pass: getEnvValue('SMTP_PASSWORD'),
  },
});

export const sendMail = (to, subject, html) => {
  return transport.sendMail({
    from: getEnvValue('SMTP_FROM'),
    to,
    subject,
    html,
  });
};
