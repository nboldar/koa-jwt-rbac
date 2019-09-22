
let config = require('../knexfile')[process.env.NODE_ENV];
/**
 * сущность, которая работает с запросами к базе данных
 */
module.exports = require('knex')(config);
