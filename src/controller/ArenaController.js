const { updateMini } = require('../storage/arenaStorage');

module.exports = {
  async update(minis) {
    for (x in minis.body) {
     let mini = minis.body[x];
      updateMini(minis.minigame, mini.name, mini.attached, mini);
    }
  }
}