export default async (session, reqFingerprint, reqIp, reqUA) => {
  return new Promise((resolve, reject) => {
    const sessionExpiredAt = session.expiredAt;
    const oldIp = session.ip;
    const oldFingerprint = session.fingerprint;
    const oldUA = session.userAgent;
    const nowTime = new Date().getTime();
    if (nowTime > sessionExpiredAt) return reject(new Error('Session expired'));
    if (oldIp !== reqIp) return reject(new Error('Session invalid. Wrong IP'));
    if (oldUA !== reqUA) return reject(new Error('Session invalid. Wrong UA'));
    if (oldFingerprint !== reqFingerprint) {
      return reject(new Error('Session invalid. Fingerprint invalid'));
    }
    resolve(true);
  });
};
