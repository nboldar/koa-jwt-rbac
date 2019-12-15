import bcript from 'bcryptjs';
import randomString from 'uuid/v4';
import UserModel from '../../models/UserModel';
import validateEmail from '../../util/validateEmail';
import { emailOptionsMaker, mailer } from '../../mailer';

class SignupAction {
  constructor() {
    this.run = async (ctx, next) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const user = {};
        const { email, password } = ctx.request.body;
        if (!email || !validateEmail(email)) {
          ctx.throw(422, 'Email required.');
        }
        if (!password) ctx.throw(422, 'Password required.');
        const salt = bcript.genSaltSync(10, 15);
        user.passwordHash = bcript.hashSync(password, salt);
        user.email = email;
        user.emailConfirmToken = randomString();
        const currentUser = await UserModel.insertModel(user);
        if (currentUser) {
          const options = emailOptionsMaker(
            email,
            currentUser.emailConfirmToken,
            currentUser.id,
          );
          console.log(options);
          mailer.sendMail(options, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          });
        }

        ctx.body = { success: true, userId: currentUser.id };
      } catch (e) {
        console.log(e.message);
        ctx.throw(500, 'internal server error');
      }
    };
  }
}
export default new SignupAction();
