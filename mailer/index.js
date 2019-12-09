import nodemailer from 'nodemailer';

export const emailOptionsMaker = (userEmail, token, userId) => {
  return {
    from: 'nboldar1@gmail.com', // sender address
    to: userEmail, // list of receivers
    subject: 'Verify your email', // Subject line
    html: `<a href="http://localhost:4040/confirm_email?token=${token}&userId=${userId}">Verify your Email</a>`, // plain text body
  };
};

export const mailer = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'nboldar1@gmail.com',
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
