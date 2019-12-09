import { makeJwtToken } from './jwtHelper';
import config from '../config/config';

export default async userId => {
  const payload = {
    tokenType: config.tokens.refreshToken.type,
    userId,
  };
  const options = {
    algorithm: 'HS512',
    subject: String(userId),
    expiresIn: config.tokens.refreshToken.expiredIn,
  };
  // eslint-disable-next-line no-return-await
  return await makeJwtToken(payload, process.env.SECRET, options);
};
