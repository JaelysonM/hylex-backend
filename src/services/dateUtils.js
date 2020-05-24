
function getDate(date) {
  var now = new Date();
  var isoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

  return isoDate;
}
module.exports = {
  getDate,
}