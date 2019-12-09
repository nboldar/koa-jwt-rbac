exports.up = function(knex) {
  return knex.schema.createTable('sessions', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('refreshToken').notNullable();
    table.string('userAgent', 200);
    table.string('fingerprint', 200);
    table.string('ip', 15).notNullable();
    table.bigInteger('expiredAt').notNullable();
    table.bigInteger('createdAt').notNullable();
    table.bigInteger('updatedAt').notNullable();
  });
};

exports.down = knex => knex.schema.dropTable('sessions');
