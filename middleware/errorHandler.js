export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    // ctx.log.info(err.message);
    ctx.body = { result: false, message: err.message, place: 'error handler' };
    ctx.app.emit('error', err, ctx);
  }
};
