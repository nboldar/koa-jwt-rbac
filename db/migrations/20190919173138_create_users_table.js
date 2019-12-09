const config = require('../../config/config');

exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table
      .increments('id')
      .primary()
      .unsigned();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('newEmail').unique();
    table.string('role').defaultTo(config.roles.user);
    table.string('passwordHash').notNullable();
    table.text('emailConfirmToken');
    table
      .boolean('isConfirmedRegistration')
      .defaultTo(false)
      .notNullable();
    table.text('resetPasswordToken');
    table.bigInteger('createdAt').notNullable();
    table.bigInteger('updatedAt').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
