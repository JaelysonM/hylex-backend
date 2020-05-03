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
      default: {}
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
  }


});

mongoose.model('BedWarsData', UserSchema);