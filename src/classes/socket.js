const {io, User} = require('../server');
const storage = [];
const server_id = [];

const run = () => {
   console.log(`\n↳ \x1b[43m\x1b[30m backend - socket.io \x1b[0m Successful connection to socket.io.`);


   io.on('connection', socket => {

    const {server} = socket.handshake.query;
    var ip = socket.handshake.headers['x-forwarded-for'];
    if (ip != "181.222.158.213") {
      console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been opened, id: \x1b[1m${socket.id}-Servername:${server}\x1b[0m`); 
      storage[socket.id] = {serverName: server};
      server_id[server] = {serverId: socket.id};
    }else {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new connection has been force closed because these IP there is not in whitelist, id: \x1b[1m${socket.id}\x1b[0m`); 
      socket.disconnect();
    }
    socket.on('require-info', r =>  debugAccount(r));
    socket.on('save-account', r =>  save(r));

    socket.on('disconnect',  () => {
      console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m The connection with id \x1b[1m${socket.id}\x1b[0m has been closed.`);
    });  
  });
}
const save = async (r) => {
  const {id} = r;
   await User.findByIdAndUpdate(id, r.body, {new :true} )
  console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - mongoose \x1b[0m A account has been saved with id: \x1b[1m${id}\x1b[0m`); 
    
}
const debugAccount = async (r) => {
  const {uuid,nickname} = r.bodyDefault;
  await User.find({uuid}, (err,result) => {
        if (err) {
      throw console.error(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A unexpected error occurred.`); 
    }
   if (result.length == 0 ) {
    createAccount({uuid,nickname, stats: {rank: null,kill_actual_rank: 0, break_actual_rank: 0, prestige: 0}});
  
     
     console.log(`\n\x1b[32m⇅ \x1b[43m\x1b[30m backend - socket.io \x1b[0m A new account has been created, user: \x1b[1m${uuid}:${nickname}\x1b[0m`); 
   }else {
    io.to(`${server_id["rankup"].serverId}`).emit("callback-info", result[0]);
    console.log(`   \x1b[31m⇅  \x1b[0m!\x1b[0m The user with UUID/Name: ${uuid}/${nickname} already have a account therefore we'll send who informations.`);
   }        
}); 
};
const createAccount = async (store) => {
 const user =await User.create(store);
 const {_id} = user;
 console.log(_id);
 io.to(`${server_id["rankup"].serverId}`).emit("callback-info", {
  _id,
  store
  
});
}
module.exports= {
  run
}