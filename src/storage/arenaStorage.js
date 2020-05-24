const Minigames = new Map();

function getArenas(minigame) {
  return Minigames.get(minigame);
}

function deleteMega(minigame , mega) {
  delete Minigames.get(minigame)[mega];
}

function registerMinigame(minigame) {
    if (Minigames.get(minigame) == null) {
      Minigames.set(minigame, []);
    }
}

function registerMega(minigame, mega) {
    registerMinigame(minigame);
    if (Minigames.get(minigame)[mega] == null) {
      Minigames.get(minigame)[mega] = [];
    }
 
  }

function registerMini(minigame,mega, mini) {
  registerMega(minigame,mega);
  Minigames.get(minigame)[mega][mini] = {
    name: mini,
    attached: mega,
    mapName: 'default',
    arena: {
       players: 0,
       maxPlayers: 8,
       state: 'OFFLINE',
       mode: 'SOLO'
    }
  }
}

function updateMini(minigame, mini, mega, body) {
  registerMini(body,mega,mini);
  Minigames.get(minigame)[mega][mini] = body;
}


function getMinigame(name) {
  return Minigames.get(name);
}

function getMini(name, mega, mini) {
  return Minigames.get(name)[mega][mini];
}

function getMega(name, mega) {
  return Minigames.get(name)[mega];
}


module.exports = {
  getMega,
  getMini,
  getMinigame,
  updateMini,
  registerMini,
  registerMega,
  registerMinigame,
  getArenas,
  deleteMega,



}