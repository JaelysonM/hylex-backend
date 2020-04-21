const knex = require("knex");
const configuration = require("../../knexfile");

const conection = knex(process.env.MODE == 'production' ?configuration.production: configuration.development);

module.exports = conection;