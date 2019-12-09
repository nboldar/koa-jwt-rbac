import { verifyToken } from '../auth/jwtHelper';
import config from '../config/config';

export default async (ctx, next) => {
  const authorization =
    ctx.req.headers['authorization'] || ctx.req.headers['Authorization'];
  const bearer =
    authorization && authorization.startsWith('Bearer ') ? authorization : null;
  const token = bearer ? bearer.split('Bearer ')[1] : null;
  ctx.request.currentUser = {
    id: null,
    role: config.roles.guest,
    email: null,
  };
  if (token) {
    try {
      const decoded = await verifyToken(token, process.env.SECRET);
      ctx.request.currentUser = { ...decoded };
      await next();
    } catch (e) {
      ctx.log.info(e.message);
      await next();
    }
  } else {
    await next();
  }
};
