const { decrypt } = require('../../services/encryptUtils');

module.exports = {
  async store(req, res) {
    const { encryptedData, iv } = req.params;
    const { merchant_order_id , status } = req.query;
    try {
      const response = decrypt({ iv, encryptedData });
      const email = response.split('-security-')[1];
      const account_name = response.split('-security-')[0];
       
      return res.redirect(`${process.env.URL_CALLBACK}?status=${status}`, {
        info: {
          email,
          account_name,
          merchant_order_id
        }
      })
    } catch (err) {
      return res.redirect(`${process.env.URL_BAD_REQUEST}`);
    }
  }
}