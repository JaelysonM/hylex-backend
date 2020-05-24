const models = [];

function deploy(mongoose) {
  models['Global_Profile'] = mongoose.model('Global_Profile');
  models['BedWarsData'] = mongoose.model('BedWarsData');
  models['Users_Rankup'] = mongoose.model('Users_Rankup');
  return models;
}


module.exports = {
  deploy,
};