class RootAction {
  constructor() {
    this.run = async (ctx, next) => {
      const user = ctx.request.currentUser;
      // ctx.log.info(user);
      ctx.body = {
        result: true,
        message: "that's root",
        user,
      };
    };
  }
}
export default new RootAction();
