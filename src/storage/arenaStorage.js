const Minigames = new Map();

function getArenas(minigame) {
  return Minigames.get(minigame);
}

function registerMinigame(minigame) {
   if (!Minigames.has(minigame)) {
     Minigames.set(minigame,new Map());
   }
  }

function registerOrUpdate(mega, minigame, arrayBody) {
  registerMinigame(minigame);
  Minigames.get(minigame).delete(mega);  
  Minigames.get(minigame).set(mega, arrayBody);
}

function deleteMega(mega, minigame) {
  Minigames.get(minigame).delete(mega);  
}

module.exports = {
  registerMinigame,
  getArenas,
  deleteMega,
  registerOrUpdate
}