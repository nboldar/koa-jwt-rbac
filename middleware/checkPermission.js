import permissions from '../permissions';

export default async (ctx, next) => {
  const userRole = ctx.request.currentUser.role;
  const requestUrl = ctx.request.url;
  console.log(userRole, requestUrl);
  if (permissions[userRole].includes(requestUrl)) {
    next();
  } else {
    ctx.throw(422, 'Access denied');
  }
};
