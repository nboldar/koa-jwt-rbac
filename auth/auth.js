import passwordHash from 'password-hash'
import User from '../entities/User'
import jwt from 'jsonwebtoken'


const wrongUserPassMsg = 'Incorrect username and/or password.';
const notActiveUserMsg = 'Please check your email box and confirm your email';
const auth = async (ctx, next) => {

    try {
        const {email, password} = ctx.query;
        if (!email) ctx.throw(422, 'Email required.');
        if (!password) ctx.throw(422, 'Password required.');

        const data = await User.getUserByEmail(email);
        const user = data[0];

        if (!user) ctx.throw(401, wrongUserPassMsg);
        if (!user.is_active) ctx.throw(401, notActiveUserMsg);
        if (passwordHash.verify(password, user.password_hash)) {
            const payload = {userId: user.id, email: user.email};
            const secretKey = process.env.JWT_SECRET || 'secret';
            ctx.body = jwt.sign(payload, secretKey);
        } else {
            ctx.throw(401, wrongUserPassMsg);
        }
    } catch (e) {
        console.log('Auth is crashed with error ' + e);
        throw new Error(e);
    }

};
export default auth;
