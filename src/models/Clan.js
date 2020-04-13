const mongoose = require('mongoose');


const ClanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    shortName: {
      type: String,
      required: false
    },
    owner: {
      type: String,
      required:false
    },
    members: {
      type: Array,
      required: false
    },
    allies: {
      type: Array,
      required: false
    },
    enemies: {
      type: Array,
      required: false
    },
    /*
      info separated by ' ; '
      [0] = Rank
      [1] = Rank score
      [2] = 'MD10' Progress
      [3] = Clan max slots.
    */
    info: {
      type: Array,
      required: false,
      default: [null,0,20,5]
    },
    historic: {
      type: Array,
      required: false
    }
});

mongoose.model('Clans_Rankup', ClanSchema);