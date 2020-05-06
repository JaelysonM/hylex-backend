const axios = require('axios');

const api = axios.create({
  baseURL: "https://api.mercadopago.com"
});

module.exports = api;