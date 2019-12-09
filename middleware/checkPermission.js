export default async (ctx, next) => {
  ctx.log.info(ctx.request.currentUser.role);
  ctx.log.info(ctx.request.url);
};
