const arenaStorage = require('../storage/arenaStorage');
const {getClientIdByName} = require('../storage/clientStorage');

const {io} = require('../server');

function randomize(a, b) {
  return Math.random() - 0.5;
}



const avaliableStatus = ['IN_WAITING','STARTING','PREPARE']

module.exports = {
  async find({ minigame, players, mode, clientName }) {
    const founded = [];

    if (arenaStorage.getMinigame(minigame) != null) {
     
      const all = Object.values(arenaStorage.getArenas(minigame));
      for (x in all) {
        for (y in all[x]) {
          if (avaliableStatus.includes(all[x][y].arena.state) && (all[x][y].arena.players + players.length) <= all[x][y].arena.maxPlayers && all[x][y].arena.mode == mode) {
            founded.push(all[x][y]);
          }
        }
      }
      if (founded.length == 0) {
        io.to(getClientIdByName(clientName)).emit('matchmaking-callback', {
          minigame,
          players,
          response: {
            type: 'No matchs found.',
            message: `Infraestructure error: We cannot find a game with avaliable slots.`
          }
        });
    
      } else {
        const matchFound = founded.sort(randomize).sort((a, b) => b.arena.players - a.arena.players)[0];
        io.to(getClientIdByName('core-bedwars-' + matchFound.attached)).emit('join-mini', {
          players,
          name: matchFound.name,
        });
        io.to(getClientIdByName(clientName)).emit('matchmaking-callback', {
          minigame,
          players,
          matchFound,
          response: {
            type: 'Matchs found',
            message: `Success: We found avaliable matchs.`
          }
        });
        matchFound.arena.players += players.length;

      }
      return;
    }
    io.to(getClientIdByName(clientName)).emit('matchmaking-callback', {
      minigame,
      players,
      response: {
        type: 'No matchs found.',
        message: `Infraestructure error: We cannot find a game with avaliable slots.`
      }
    });
  }


}