module.exports = {
  roles: {
    admin: 'ROLE_ADMIN',
    moderator: 'ROLE_MODERATOR',
    user: 'ROLE_USER',
    guest: 'ROLE_GUEST',
  },
  tokens: {
    accessToken: {
      type: 'access',
      expiredIn: '10m',
    },
    refreshToken: {
      type: 'refresh',
      expiredIn: '10d',
    },
  },
  maxSessionsQuantity: 5,
};
