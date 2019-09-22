import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'nboldar1@gmail.com',
        pass: 'cxlbamiselqulpob',
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});

export default transporter;
