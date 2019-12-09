import bcrypt from 'bcryptjs';
import UserModel from '../../models/UserModel';
import validateEmail from '../../util/validateEmail';
import makeAccessTokenHelper from '../../auth/makeAccessTokenHelper';
import makeRefreshTokenHelper from '../../auth/makeRefreshTokenHelper';
import SessionEntity from '../../entities/SessionEntity';
import SessionModel from '../../models/SessionModel';

class LoginAction {
  constructor() {
    this.run = async (ctx, next) => {
      try {
        const { email, password, fingerprint } = ctx.request.body;
        if (!email || !validateEmail(email)) {
          ctx.throw(422, 'Email required.');
        }
        if (!password) ctx.throw(422, 'Password required.');
        const user = await UserModel.getByEmail(email);
        if (bcrypt.compareSync(password, user.passwordHash)) {
          const accessToken = await makeAccessTokenHelper(user);
          const refreshToken = await makeRefreshTokenHelper(user.id);
          const session = new SessionEntity({
            userId: user.id,
            fingerprint,
            ip: ctx.ip,
            ua: ctx.headers['user-agent'],
            refreshToken,
          });
          await SessionModel.insertSession(session);
          ctx.body = {
            data: { refreshToken, accessToken },
          };
        } else {
          ctx.throw(422, 'Wrong password.');
        }
      } catch (e) {
        console.log(e.message);
        throw e;
      }
    };
  }
}
export default new LoginAction();
