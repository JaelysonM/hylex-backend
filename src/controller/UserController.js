const {io, User} = require('../server');
const {getClientIdByName} = require('../storage/clientStorage');


module.exports = {
  async index( {bodyDefault} ) {
    const { uuid, nickname } = bodyDefault;
    try {
      const result = await User.findOne({ uuid });
      io.to(getClientIdByName('rankup')).emit("callback-info", result);
      console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m Account loaded | Nickname: \x1b[1m${result.nickname}\x1b[0m UUID: \x1b[1m${result.uuid}\x1b[0m`); 
    
    }catch (err){
      console.log(err);
      this.create(
        {
        uuid,
        nickname, 
        token: null, 
        discord: {
          account_id : null,
          account_situation: "UNLINKED"
        }, 
        stats: {
          rank: null,
          kill_actual_rank: 0, 
          break_actual_rank: 0, 
          prestige: 0
        }
       });
    }

  },
  async create(body) {
    const user =await User.create(body);
    io.to(getClientIdByName('rankup')).emit('callback-info',user);
    console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m Account created | Nickname: \x1b[1m${user.nickname}\x1b[0m UUID: \x1b[1m${user.uuid}\x1b[0m`); 
    
  },
  async update(id, body) {
    await User.findByIdAndUpdate(id, body, {new :true} );
    console.log(`\n\x1b[30m✎ \x1b[43m\x1b[30m backend - mongoose \x1b[0m Account updated: \x1b[1m${id}\x1b[0m`); 
  }
}
