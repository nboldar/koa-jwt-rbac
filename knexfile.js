// Update with your config settings.
const dotenv = require('dotenv');

const { env } = process;
if (!env.NODE_ENV) {
  dotenv.config();
}
module.exports = {
  development: {
    client: env.DB_CLIENT,
    connection: {
      database: env.DB_DATABASE,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      port: env.DB_PORT,
      host: env.DB_HOST,
      charset: 'utf8',
    },

    migrations: {
      directory: './db/migrations',
    },
  },

  production: {
    client: env.DB_CLIENT,
    connection: {
      database: env.DB_DATABASE,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      port: env.DB_PORT,
      host: env.DB_HOST,
    },

    migrations: {
      directory: './db/migrations',
    },
  },
};
