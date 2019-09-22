import jwt from 'jsonwebtoken'


const secret = process.env.JWT_SECRET || 'secret';
const isAuthenticated = async (ctx, next) => {
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];
    try {
        ctx.request.jwtPayload = jwt.verify(token, secret);
    } catch (e) {
        ctx.throw(e.status || 403, e.text);
    }
    await next();
};
export default isAuthenticated
