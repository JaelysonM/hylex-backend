const getFullUrl = (req) => {
  const url = req.protocol + '://' + req.get('host');
  return url;
}

module.exports ={
  getFullUrl
}