// Get config file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const requireDir = require('require-dir');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const { errors } = require("celebrate");



/*
 
 MercadoPago build

*/


try {

  console.log(`Mongoose URL > ${process.env.MONGO_URL}`);
  mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  console.log(`\n↳ \x1b[42m\x1b[30m mongoose \x1b[0m Connection estabilished, connected to: \x1b[4m${process.env.DATABASE}\x1b[0m`);

  requireDir('./models');

  app.use(express.json());
  app.disable('x-powered-by');
  app.use(cors());

  /*
  
   Schema deploy
  
  */


  const { deploy } = require('./services/schemaUtils');
  const models = deploy(mongoose);

  const schema = models['BedWarsData'];
  /**/

  module.exports = {
    io,
    models
  }
  /*
  
   Socket deploy
  
  */
  const { socket } = requireDir("services");

  socket.deploy(io);

  /**/

  /*
  
   Router
  
  */
  app.use(require("./routes"));
  app.use(errors());

  /**/

  console.log(`\n↳ \x1b[46m\x1b[30m web - MercadoPago \x1b[0m MercadoPago deployed with token: ${process.env.MP_ACCESS_TOKEN}\x1b[4m3333\x1b[0m`)

  server.listen(process.env.PORT || 3333, console.log(`\n↳ \x1b[46m\x1b[30m backend - server \x1b[0m RestAPI and Services listening on port: \x1b[4m3333\x1b[0m`));


} catch (err) {
  console.log(err);
  console.log(`\n\x1b[31m✖ \x1b[43m\x1b[30m mongoose \x1b[0m A error occoured connect mongo.`);
}


setInterval(() => {
  global.gc();
}, 1000 * 30);

setInterval(() => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  process.stdout.write("\r\x1b[K");
  process.stdout.write(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}, 1000);






