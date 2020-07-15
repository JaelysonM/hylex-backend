const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { manage_token } = req.headers;
    const { limit } = req.query;
    if (manage_token == process.env.MANAGE_TOKEN) {
      const purchases = await connection('purchases').select("*").limit(limit);
      return res.json(purchases);
    } else {
      return res.json({
        error: 401,
        message: 'Invalid manage token.'
      });
    }
  },
}