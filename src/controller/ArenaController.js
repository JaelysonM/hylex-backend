const { updateMini, registerOrUpdate } = require('../storage/arenaStorage');

module.exports = {
  async update(minis) {
    if (minis.body.length > 0) {
      let mega = minis.body[0].attached;
      registerOrUpdate(mega, minis.minigame, minis.body);
    }
  }
}