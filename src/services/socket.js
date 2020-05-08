require('dotenv')
const { getClientIdByName, registerClient, deleteClient, getClientNameByID } = require('../storage/clientStorage');

const DataController = require('../controller/DataController');

const arenaStorage = require('../storage/arenaStorage');

const MatchmakingController = require('../controller/MatchmakingController');

const ArenaController = require('../controller/ArenaController');

function deploy(io) {
  console.log(`\n↳ \x1b[43m\x1b[30m socket.io \x1b[0m Successful created a socket.io server.`);

  io.on('connection', socket => {

    const { server ,arenaClient = false, thirdParty = false } = socket.handshake.query;
    const { authorization } = socket.handshake.headers;
    const combineToken = process.env.AUTHORIZATION_TOKEN;

    if (combineToken == authorization) {
      if (getClientIdByName(server) == null) {

        registerClient(socket.id, server);


        console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m socket.io \x1b[0m A new client has connected.`);
        console.log(` \x1b[32m↳ \x1b[43m\x1b[0m Name: ${server}`);
        console.log(` \x1b[32m↳ \x1b[43m\x1b[0m Id: ${socket.id}`);
        console.log(` \x1b[32m↳ \x1b[43m\x1b[0m Arena-Client: ${arenaClient}`);
        console.log(` \x1b[32m↳ \x1b[43m\x1b[0m ThirdParty-Client: ${thirdParty}`);
        if (thirdParty == 'null'){
          console.log(` \x1b[32m↳ \x1b[43m\x1b[0m New third-party client: ${server}`);
      
          return;
        }
        if (arenaClient == 'true') {
           arenaStorage.registerMinigame(server.replace().split('-')[1]);
           arenaStorage.registerMega(server.split('-')[1], server.split('-')[2]);
           console.log(` \x1b[32m↳ \x1b[43m\x1b[0m Trying to register this ${server.split('-')[1]} MEGA-ARENA: ${server.split('-')[2]}`);
        }

      } else {
        console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m socket.io \x1b[0m A connection to the server was rejected, as there is already a connected client with the name: ${server}`);
        socket.emit("disconnect-f", {
          error: 401,
          message: "Duplicated client."
        });
        socket.disconnect(true);
      }
    } else {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m socket.io \x1b[0m A connection to the server was rejected because the authorization code was incorrect`);
      socket.emit("disconnect-f", {
        error: 401,
        message: "Invalid authentication code"
      });
      socket.disconnect(true);
    }
    /*
      Account events
    */

    socket.on('data-require', r => DataController.index(r))

    socket.on('data-save', r => DataController.update(r));

    /*
      Discord intregation events
    */
    socket.on('discord-callback', r => getClientIdByName('rankup') != null ? io.to(getClientIdByName('rankup')).emit("discord-callback", r) : console.warn('[Socket.io] client "rankup" is disconnected.'));

    socket.on('loginstaff-purge', r => getClientIdByName('discord') != null ? io.to(getClientIdByName('discord')).emit("loginstaff-purge", r) : console.warn('[Socket.io] client "discord" is disconnected.'));

    socket.on('loginstaff', r => getClientIdByName('discord') != null ? io.to(getClientIdByName('discord')).emit("loginstaff", r) : console.warn('[Socket.io] client "discord" is disconnected.'));

    socket.on('loginstaff-callback', r => getClientIdByName('rankup') != null ? io.to(getClientIdByName('rankup')).emit("loginstaff", r) : console.warn('[Socket.io] client "rankup" is disconnected.'));

  
    socket.on('search-arena', r => MatchmakingController.find(r));
    socket.on('update-mini', r =>ArenaController.update(r));

    socket.on('disconnect', () => {
      
      const clientName = getClientNameByID(socket.id);
      if (clientName.startsWith("core-bedwars")) {
        const minigame = clientName.split("-")[1];
        const mega = clientName.split("-")[2];
        arenaStorage.deleteMega(minigame,mega);
  
      }

    console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m socket.io \x1b[0m Connection closed | Id: \x1b[1m${socket.id} Name: ${getClientNameByID(socket.id)}`);
    deleteClient(socket.id);

    });
  }
  );
}

module.exports = {
  deploy
}
