require('dotenv')
const {io,User} = require('../server');

const {getClientIdByName, registerClient, deleteClient,getClientNameByID} = require('../storage/clientStorage');

const UserController = require('../controller/UserController');

const GlobalProfileController = require('../controller/GlobalProfileController');


var total = 0;


async function stress(body) {
  const user =await User.create(body);
  console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m Stressed account created | id: \x1b[1m${user._id} TOTAL: ${total}`); 
  total+=1;
}








function deploy() {
  console.log(`\n↳ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Successful created a socket.io server.`);
  
  io.on('connection', socket => {

     const {server} = socket.handshake.query;
     const {authorization} = socket.handshake.headers;
     const combineToken = process.env.AUTHORIZATION_TOKEN;

     if (combineToken == authorization) {
      if (getClientIdByName(server) == null) {
        registerClient(socket.id,server);
        console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new client has connected.`); 
        console.log(` \x1b[32m↳ \x1b[43m\x1b[0m Name: ${server}`);
        console.log(` \x1b[32m↳ \x1b[43m\x1b[0m Id: ${socket.id}`);

      }else {
        console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A connection to the server was rejected, as there is already a connected client with the name: ${server}`); 
        socket.emit("disconnect-f",{
          error: 401,
          message: "Duplicated client."
        });
        socket.disconnect(true);
      }
     }else {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A connection to the server was rejected because the authorization code was incorrect`); 
      socket.emit("disconnect-f",{
        error: 401,
        message: "Invalid authentication code"
      });
      socket.disconnect(true);
     }
     /*
       Account events
     */
     socket.on('require-info', r => r. UserController.index(r));

     socket.on('save-account', r =>  UserController.update(r.id,r.body));

     socket.on('require-globalprofile', r =>  GlobalProfileController.index(r));

     socket.on('save-globalprofile', r =>  GlobalProfileController.update(r.id,r.body));

     /*
       Discord intregation events
     */
     socket.on('discord-callback', r => getClientIdByName('rankup') !=null ? io.to(getClientIdByName('rankup')).emit("discord-callback", r):console.warn('[Socket.io] client "rankup" is disconnected.'));

     socket.on('loginstaff-purge', r => getClientIdByName('discord') !=null ? io.to(getClientIdByName('discord')).emit("loginstaff-purge", r):console.warn('[Socket.io] client "discord" is disconnected.'));
    
     socket.on('loginstaff', r => getClientIdByName('discord') !=null ? io.to(getClientIdByName('discord')).emit("loginstaff", r):console.warn('[Socket.io] client "discord" is disconnected.'));
    
     socket.on('loginstaff-callback', r => getClientIdByName('rankup') !=null ? io.to(getClientIdByName('rankup')).emit("loginstaff", r):console.warn('[Socket.io] client "rankup" is disconnected.'));

     socket.on('disconnect',  () => {
      
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Connection closed | Id: \x1b[1m${socket.id} Name: ${getClientNameByID(socket.id)}`);
      deleteClient(socket.id);
     
    }); 
  }
  
  );
}

module.exports= {
 deploy
}
