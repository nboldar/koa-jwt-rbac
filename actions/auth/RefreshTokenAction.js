import SessionModel from '../../models/SessionModel';
import { verifyToken, decodeToken } from '../../auth/jwtHelper';
import validateSession from '../../auth/validateSession';
import UserModel from '../../models/UserModel';
import makeAccessTokenHelper from '../../auth/makeAccessTokenHelper';
import makeRefreshTokenHelper from '../../auth/makeRefreshTokenHelper';
import SessionEntity from '../../entities/SessionEntity';

class RefreshTokenAction {
  constructor() {
    this.run = async (ctx, next) => {
      try {
        const reqRefreshToken = ctx.request.body.refreshToken;
        const reqFingerprint = ctx.request.body.fingerprint;
        const reqIp = ctx.ip;
        const reqUA = ctx.headers['user-agent'] || ctx.headers['User-Agent'];
        // console.log(reqUA);
        const oldSession = await SessionModel.getByRefreshToken(
          reqRefreshToken,
        );
        await SessionModel.deleteById(oldSession.id);
        const decoded = await decodeToken(reqRefreshToken);
        console.log(decoded);
        const verifiedDecoded = await verifyToken(
          reqRefreshToken,
          process.env.SECRET,
        );

        ctx.userId = decoded.userId;

        if (
          verifiedDecoded &&
          (await validateSession(oldSession, reqFingerprint, reqIp, reqUA))
        ) {
          const user = await UserModel.getById(verifiedDecoded.userId);
          const accessToken = await makeAccessTokenHelper(user);
          const refreshToken = await makeRefreshTokenHelper(user.id);
          await SessionModel.insertModel(
            new SessionEntity({
              userId: user.id,
              fingerprint: reqFingerprint,
              ip: reqIp,
              ua: reqUA,
              refreshToken,
            }),
          );
          ctx.body = {
            data: {
              accessToken,
              refreshToken,
            },
          };
        } else {
          ctx.throw(422, 'Invalid token');
        }
      } catch (e) {
        ctx.log.info(e.message);
        await SessionModel.deleteAllSessionsByUserId(ctx.userId);
      }
    };
  }
}
export default new RefreshTokenAction();
