const arenaStorage = require('../storage/arenaStorage');
const { getClientIdByName } = require('../storage/clientStorage');

const { io } = require('../server');

function randomize(a, b) {
  return Math.random() - 0.5;
}

const avaliableStatus = ['IN_WAITING', 'STARTING', 'PREPARE'];

module.exports = {
  async find({ minigame, players, mode, clientName }) {
    let founded = [];
    if (arenaStorage.getArenas(minigame) != null && Array.from(arenaStorage.getArenas(minigame).values()).length > 0) {

      let reducedArray = Array.from(arenaStorage.getArenas(minigame).values())
        .reduce((result, current) => {
          result.push(...current);
          return result;
        });

      for (const mini of reducedArray) {
        if (avaliableStatus.includes(mini.arena.state) && (mini.arena.players + players.length) <= mini.arena.maxPlayers && mini.arena.mode == mode) {
          founded.push(mini);
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
        let lists = founded.sort(randomize).sort((a, b) => b.arena.players - a.arena.players).filter(matchFound => (matchFound.arena.players + players.length) <= matchFound.arena.maxPlayers);
        if (lists.length >= 1) {
          let matchFound = lists[0];

          if ((matchFound.arena.players + players.length) <= matchFound.arena.maxPlayers) {
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
            if ((matchFound.arena.players + players.length) <= matchFound.arena.maxPlayers) {
              matchFound.arena.players += players.length;
            }
            if (matchFound.arena.players >= matchFound.arena.maxPlayers) {
              matchFound.arena.state = "FULL";
            }
          } else {
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