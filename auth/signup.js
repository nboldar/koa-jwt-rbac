import User from '../entities/User'
import mailer from '../mailer/index'
import randomstring from 'randomstring'


const mailOptions = (userEmail, token, userId) => {
    return {
        from: 'nboldar1@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: `<a href="http://localhost:4040/confirm_email?token=${token}&userId=${userId}">Verify your Email</a>`// plain text body
    }
};
const signup = async (ctx, next) => {
    const data = ctx.query;
    if (!data.email) ctx.throw(422, 'Email required.');
    if (!data.password) ctx.throw(422, 'Password required.');
    try {
        const emailToken = randomstring.generate();
        const userId = await User.addUser(data, emailToken);
        const options = mailOptions(data.email, emailToken, userId[0]);
        mailer.sendMail(options, (err, info) => {
            if (err)
                console.log(err);
            else
                console.log(info);
        });
        ctx.body = userId[0];

    } catch (e) {
        console.log('Registration is crashed with error ' + e);
        throw new Error(e);
    }
};
export default signup;
