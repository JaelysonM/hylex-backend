const knex = require("knex");
const configuration = require("../../knexfile");

const conection = knex(configuration.development);

module.exports = conection;