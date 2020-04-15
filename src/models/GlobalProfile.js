const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema( {
 uuid: {
   type: String,
   required: true,
 },
 nickname: {
  type: String,
  required: true,
},
lobbys: {
  preferences: {
    players: {
      type: Boolean,
      required:false,
      default: true
    }   
  }
}

 
});

 mongoose.model('Global_Profile', UserSchema);