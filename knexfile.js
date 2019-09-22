// Update with your config settings.


const env = process.env;
if (!env.NODE_ENV) {
    require('dotenv').config();
}
module.exports = {

    development: {
        client: env.DB_CLIENT,
        connection: {
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            port: env.DB_PORT,
            host: env.DB_HOST
        },

        migrations: {
            directory: './db/migrations'
        }
    },

    production: {
        client: env.DB_CLIENT,
        connection: {
            database: env.DB_DATABASE,
            user: env.DB_USER,
            password: env.DB_PASSWORD,
            port: env.DB_PORT,
            host: env.DB_HOST
        },

        migrations: {
            directory: './db/migrations'
        }
    }

};
