import { makeJwtToken } from './jwtHelper';
import config from '../config/config';

export default async userEntity => {
  const payload = {
    tokenType: config.tokens.accessToken.type,
    userRole: userEntity.role,
    email: userEntity.email,
  };
  const options = {
    algorithm: 'HS512',
    subject: String(userEntity.id),
    expiresIn: config.tokens.accessToken.expiredIn,
  };
  // eslint-disable-next-line no-return-await
  return await makeJwtToken(payload, process.env.SECRET, options);
};
