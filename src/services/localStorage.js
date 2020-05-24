const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage(`/tmp/node-localStorage`);

module.exports = localStorage;