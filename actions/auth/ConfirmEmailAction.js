import UserModel from '../../models/UserModel';

class ConfirmEmailAction {
  constructor() {
    this.run = async (ctx, next) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const { token, userId } = ctx.request.query;
        const user = await UserModel.getById(userId);
        // TODO-me redo on jwt-token
        if (user.emailConfirmToken === token) {
          await UserModel.update(userId, {
            isConfirmedRegistration: 1,
            emailConfirmToken: null,
          });
          ctx.body = {
            isConfirmedRegistration: true,
            message: 'Registration was confirmed successfully',
          };
        } else {
          ctx.body = {
            isConfirmedRegistration: false,
            message: 'Registration is already confirmed or wrong token',
          };
        }
      } catch (e) {
        console.log(e.message);
        ctx.throw(500, 'internal server error');
      }
    };
  }
}
export default new ConfirmEmailAction();
