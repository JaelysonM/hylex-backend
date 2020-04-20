
const conection = require('../database/conection');

module.exports = {
  async index(req, res) {
    const { manage_token } = req.headers;
    if (manage_token == process.env.MANAGE_TOKEN) {
      const purchases = await conection('purchases').select("*");
      return res.json(purchases);
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

      await conection('purchases').where('id', id).delete();

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