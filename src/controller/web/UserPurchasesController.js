
const connection = require('../../database/connection');

module.exports = {
  async index(req, res) {
    const { manage_token } = req.headers;

    const { username } = req.params;

    if (manage_token == process.env.MANAGE_TOKEN) {

        const purchases = await connection('purchases').select("*").where('account_name', username);
        return res.json(purchases);
      
    } else {
      return res.json({
        error: 401,
        message: 'Invalid manage token.'
      });
    }
  },

}