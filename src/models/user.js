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
  token: {
    type: String,
    required: false,
    default: null,
  },
  discord: {
    account_id: {
      type: String,
      required: false,
      default: null,
    },
    account_situation: {
      type: String,
      required: false,
      default: "UNLINKED",

    },

  },
  stats: {
    rank: {
      type: String,
      required: false,
      default: null,
    },
    prestige: {
      type: Number,
      required: false,
      default: 0,
    },
    historic: {
      type: Array,
      required: false,
      default: [],
    },
    kill_actual_rank: {
      type: Number,
      required: false,
      default: 0,
    },
    break_actual_rank: {
      type: Number,
      required: false,
      default: 0,
    }
  }


});

mongoose.model('Users_Rankup', UserSchema);
