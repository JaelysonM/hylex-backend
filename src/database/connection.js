const knex = require("knex");
const configuration = require("../../knexfile");

const connection = knex(process.env.MODE == 'production' ?configuration.production: configuration.development);

module.exports = connection;