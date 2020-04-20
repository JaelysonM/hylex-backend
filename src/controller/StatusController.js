

const { decrypt } = require('../services/encryptUtils');

const { getDate } = require('../services/dateUtils');

const conection = require('../database/conection');

const { io } = require('../server');

module.exports = {
  async store(req, res) {
    const { encryptedData, iv , status } = req.params;
    try {
      const response = decrypt({ iv, encryptedData });
      const email = response.split('-security-')[2];
      const account_name = response.split('-security-')[1];
      const product_id = response.split('-security-')[0];
      const { merchant_order_id, payment_type } = req.query;

      await conection('purchases').insert({
        id: merchant_order_id,
        account_name,
        payment_type,
        email,
        status,
        createdAt: getDate(new Date()),
        approvedAt: status == 'success' ? getDate(new Date()) : "N/A"
      });

      if (status == "success") {
        io.emit('activate-product-web', {
          product_id: product_id,
          account_name,
          status,
        });
        console.log('Sending a socket > Activate Product');
      }
    } catch (err) {
      return res.redirect(`${process.env.URL_BAD_REQUEST}`);
    }
  }
}