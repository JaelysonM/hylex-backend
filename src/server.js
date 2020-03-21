// Get config file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requireDir = require('require-dir');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

/*
 Mongoose connection
*/


const uri = "mongodb+srv://admin1:JOPvJIMCX9L9G2R7@hylex-idguu.mongodb.net/hylex?retryWrites=true&w=majority";


try {
  mongoose.connect(`${uri}`,{useNewUrlParser: true, useFindAndModify: false});
  console.log(`\n↳ \x1b[42m\x1b[30m backend - mongoose \x1b[0m Connection estabilished, connected to: \x1b[4m${process.env.DATABASE}\x1b[0m`)
}catch (err){
  console.log(err);
  console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - mongoose \x1b[0m A error occoured connect mongo.`); 
      
}
 requireDir('./models');
/*
*/

app.disable('x-powered-by');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/*
 Export consts
*/
module.exports= {
  io,
  User: mongoose.model('Users_Rankup')
}
/*
*/

/*
 Run app
*/
 // app.use('/api', require('./routes'));
const {socket} =requireDir("classes");
socket.run();
/*
*/

server.listen(process.env.PORT ||3333, console.log(`\n↳ \x1b[46m\x1b[30m backend - server \x1b[0m Listening on port: \x1b[4m3333\x1b[0m`));







