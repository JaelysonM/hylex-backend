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
  lobbys: {
    preferences: {
      first_login: {
        type: Number,
        required: false,
        default: Date.now()
      },
      last_login: {
        type: Number,
        required: false,
        default: Date.now()
      },
      players: {
        type: Boolean,
        required: false,
        default: true
      },
      tell: {
        type: Boolean,
        required: false,
        default: true
      },
      report: {
        type: Boolean,
        required: false,
        default: true
      },
      party: {
        type: Boolean,
        required: false,
        default: true
      },
    }
  }


});

mongoose.model('Global_Profile', UserSchema);