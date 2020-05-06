
const connection = require('../../database/connection');

module.exports = {
  async index(req, res) {
    const { manage_token } = req.headers;

    const { quantity } = req.query;
    if (manage_token == process.env.MANAGE_TOKEN) {
      
      if (quantity == null) {
        const purchases = await connection('purchases').select("*");
        return res.json(purchases);
      }else {
        const purchases = await connection('purchases').select("*").limit(quantity)
        return res.json(purchases);
      }

    } else {
      return res.json({
        error: 401,
        message: 'Invalid manage token.'
      });
    }
  },
  async delete(req, res) {
    const { manage_token } = req.headers;
    const { id } = req.params;
    if (manage_token == process.env.MANAGE_TOKEN) {

      await connection('purchases').where('id', id).delete();

      return res.json({
        code: 500,
        message: 'The attempt to delete the purchase was successful.',
        purchase_id: id
      });

    } else {
      return res.json({
        error: 401,
        message: 'Invalid manage token.'
      });
    }

  },
}