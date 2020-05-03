const { updateMini } = require('../storage/arenaStorage');

module.exports = {
  async update(minis) {
    for (x in minis.body) {
     const mini = minis.body[x];
      updateMini(minis.minigame, mini.name, mini.attached, mini);

    }
  }
}