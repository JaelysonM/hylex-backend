const { io } = require('../server');
const { getClientIdByName } = require('../storage/clientStorage');
const { GlobalProfile } = require('../models/GlobalProfile');

module.exports = {
  async index({ bodyDefault }) {
    const { uuid, nickname, clientToSend } = bodyDefault;
    try {
      const result = await GlobalProfile.findOne({ uuid });
      io.to(getClientIdByName(clientToSend)).emit("profile-callback", result);
      console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m GlobalProfile loaded | Nickname: \x1b[1m${result.nickname}\x1b[0m UUID: \x1b[1m${result.uuid}\x1b[0m`);
    } catch (err) {
      this.store({ uuid, nickname, }, clientToSend);
    }
  },
  async store(body, clientToSend) {
    const user = await GlobalProfile.create(body);
    io.to(getClientIdByName(clientToSend)).emit('profile-callback', user);
    console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m GlobalProfile created | Nickname: \x1b[1m${user.nickname}\x1b[0m UUID: \x1b[1m${user.uuid}\x1b[0m`);

  },
  async update(id, body) {
    await GlobalProfile.findByIdAndUpdate(id, body, { new: true });
    console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m GlobalProfile updated: \x1b[1m${id}\x1b[0m`);
  }
}