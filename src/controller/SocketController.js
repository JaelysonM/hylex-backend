const {io, User} = require('../server');
const storage = [];
const server_id = [];

const run = () => {
  console.log(`\n↳ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Successful connection to socket.io.`);
 

   io.on('connection', socket => {

    const {server} = socket.handshake.query;
    const ip = socket.handshake.headers['x-forwarded-for'];

    if (ip != "181.222.158.213") {
      console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been opened, id: \x1b[1m${socket.id}Client:${server}\x1b[0m`); 
      if (server_id[server] ==null) {
        storage[socket.id] = {serverName: server};
        server_id[server] = {serverId: socket.id};
      }else {
        console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been force closed because these already have a client with name: \x1b[1m${server}\x1b[0m`); 
        socket.disconnect();
      }

    }else {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been force closed because these IP there is not in whitelist, id: \x1b[1m${socket.id}\x1b[0m`); 
      socket.disconnect();
    }

    /* System events  */
    socket.on('require-info', r =>  loadAccount(r));
    socket.on('save-account', r =>  saveAccount(r));
    socket.on('discord-callback', r =>  {

      const { uuid, name_discord,account_id} = r;
      const resolve =  {
        uuid,
        name_discord,
        account_id
      };
    
      io.to(`${server_id["rankup"].serverId}`).emit("discord-callback", resolve);
    });


    socket.on('disconnect',  () => {

      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m The connection with id \x1b[1m${socket.id}/Client:${storage[socket.id].serverName}\x1b[0m has been closed.`);
      server[storage[socket.id].serverName] = {};
      storage[socket.id] = {};
    });  
  });
}
const saveAccount = async ({id,body }) => {
   await User.findByIdAndUpdate(id, body, {new :true} );
   console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - mongoose \x1b[0m A account has been saved with id: \x1b[1m${id}\x1b[0m`); 
    
}
const loadAccount = async ( {bodyDefault }) => {
  const { uuid, nickname } = bodyDefault;

  await User.find({ uuid }, (err,result) => {
        if (err) {
            throw console.error(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A unexpected error occurred.`); 
         }
   if (result.length == 0 ) {

    createAccount({uuid,nickname, token: null, discord: {account_id : null,account_situation: "UNLINKED"}, stats: {rank: null,kill_actual_rank: 0, break_actual_rank: 0, prestige: 0}});
    console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new account has been created, user: \x1b[1m${uuid}:${nickname}\x1b[0m`); 

   }else {

    io.to(`${server_id["rankup"].serverId}`).emit("callback-info", result[0]);
    console.log(`   \x1b[31m⇅  \x1b[0m!\x1b[0m The user with UUID/Name: ${uuid}/${nickname} already have a account therefore we'll send who informations.`);
   
  }        
}); 
};
const createAccount = async (store) => {
 const user =await User.create(store);
 const { _id, uuid,nickname,stats,discord, token} = user;

 io.to(`${server_id["rankup"].serverId}`).emit("callback-info", {
  _id,
  uuid,
  token,
  nickname,
  stats,
  discord
  
});

}
module.exports= {
  run
}