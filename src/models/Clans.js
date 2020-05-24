const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  stats: {
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    ranked: {
      progress: {
        type: Number,
        required: false,
        default: 0,
      }
    }
  },
  clan: {
    members: {
      type: Array,
      required: false,
      default: ['88c3860d-0367-45b5-83b8-2f30c25ba6e9:MEMBER', '88c3860d-0367-45b5-83b8-2f30c25ba6e9:ADMIN']
    },
    allies: {
      type: Array,
      required: false,
      default: []
    },
    enemies: {
      type: Array,
      required: false,
      default: []
    }
  }


});
mongoose.model('Clans', UserSchema);