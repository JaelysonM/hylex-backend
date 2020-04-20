const Clients = new Map();
const { getByValue } = require('../services/getByValue');

function getClientNameByID(id) {
  return Clients.get(id);
}

function getClientIdByName(name) {
  return getByValue(Clients, name)
}
function registerClient(id, name) {
  Clients.set(id, name);
  Clients[name] = {
    id,
    clientName: name

  }
}

function deleteClient(id) {
  Clients.delete(id);
}

module.exports = {
  registerClient,
  getClientNameByID,
  getClientIdByName,
  deleteClient,
}