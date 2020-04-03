const mongoose = require('mongoose');


const ClanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    shortName: {
      type: String,

    }
});

mongoose.model('Clans_Rankup', ClanSchema);