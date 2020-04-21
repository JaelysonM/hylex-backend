const knex = require("knex");
const configuration = require("../../knexfile");

const conection = knex(configuration.production);

module.exports = conection;