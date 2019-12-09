import jwt from 'jsonwebtoken';

export const makeJwtToken = (payload, secret, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        reject(new Error(error.message));
      }
      return resolve(token);
    });
  });
};

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return reject(new Error(error.message));
      }
      return resolve(decoded);
    });
  });
};

export const decodeToken = token => {
  return new Promise((resolve, reject) => {
    const decoded = jwt.decode(token, { complete: true });
    return decoded ? resolve(decoded) : reject(new Error('Token not decoded'));
  });
};
