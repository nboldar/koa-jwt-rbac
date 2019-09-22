const config = require('../../config/config');

exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable().unique();
        table.string('password_hash').notNullable();
        table.integer('is_active').defaultTo(0);
        table.integer('role').defaultTo(config.user);
        table.string('email_token');
        table.string('reset_password_token');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
