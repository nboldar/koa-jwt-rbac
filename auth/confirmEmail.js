import User from '../entities/User'
import db from '../db/db'

const confirmEmail = async (ctx, next) => {
    try {
        const {token, userId} = ctx.query;
        const user = await User.getUserById(userId);
        const isConfirmed = token === user[0].email_token;

        if (isConfirmed) {
            await db('users').where({id: userId}).update('is_active', 1);
        }
        ctx.body = {emailConfirm: isConfirmed};
    } catch (e) {
        console.log(e);
    }


};
export default confirmEmail;
