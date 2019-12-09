import ms from 'ms';
import config from '../config/config';

export default class SessionEntity {
  constructor({ userId, fingerprint, ip, ua = null, refreshToken } = {}) {
    if (!userId || !fingerprint || !ip) {
      throw new Error('SessionEntity creation error, wrong props');
    }
    this.userId = userId;
    this.fingerprint = fingerprint;
    this.ip = ip;
    this.userAgent = ua;
    this.refreshToken = refreshToken;
    this.expiredAt =
      new Date().getTime() + ms(config.tokens.refreshToken.expiredIn);
  }
}
