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

try {

  console.log(`Mongoose URL > ${process.env.MONGO_URL}`);
  mongoose.connect(`${process.env.MONGO_URL}`,{useNewUrlParser: true, useFindAndModify: false});
  console.log(`\n↳ \x1b[42m\x1b[30m backend - mongoose \x1b[0m Connection estabilished, connected to: \x1b[4m${process.env.DATABASE}\x1b[0m`)
}catch (err){
  console.log(err);
  console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m backend - mongoose \x1b[0m A error occoured connect mongo.`); 
      
}



 app.disable('x-powered-by');
 app.use(cors());

 requireDir('./models');
/*
 Export consts
*/

module.exports= {
  io,
  User: mongoose.model('Users_Rankup'),
  GlobalProfile: mongoose.model('Global_Profile')
}
/*
*/

/*
 Run app
*/

const { socket } =requireDir("services");
socket.deploy();

server.listen(process.env.PORT ||3333, console.log(`\n↳ \x1b[46m\x1b[30m backend - server \x1b[0m Listening on port: \x1b[4m3333\x1b[0m`));