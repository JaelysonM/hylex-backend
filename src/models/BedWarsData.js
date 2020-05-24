const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  preferences: {
    activeCosmetics: {
      type: Array,
      required: false,
      default: []
    },
    quickBuy: {
      type: Object,
      required: false,
      default: {
        '19': "1:wool",
        '20': "2:stone",
        '21': "3:chainmail",
        '22': "7:enderpearl",
        '23': "5:bow",
        '24': "6:speed2",
        '25': "7:tnt",
        '28': "1:oakwoodplanks",
        '29': "2:iron",
        '30': "3:iron",
        '31': "4:shears",
        '32': "5:arrow",
        '33': "6:invisibility1",
        '34': "7:waterbucket",
      }
    },
  },
  statistics: {
    kills: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    finalDeaths: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    finalKills: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    bedsBroken: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    bedsLost: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    deaths: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    wins: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    games: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
      solo: {
        type: Number,
        require: false,
        default: 0,
      },
      dupla: {
        type: Number,
        require: false,
        default: 0,
      },

    },
    coins: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
    },
    exp: {
      global: {
        type: Number,
        require: false,
        default: 0,
      },
    },
  }


},{ minimize: false });

mongoose.model('BedWarsData', UserSchema);