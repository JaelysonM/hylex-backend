

const { decrypt } = require('../../services/encryptUtils');

const { getDate } = require('../../services/dateUtils');

const conection = require('../../database/conection');

const { io } = require('../../server');

module.exports = {
  async store(req, res) {
    const { encryptedData, iv , status } = req.params;
    try {
      const response = decrypt({ iv, encryptedData });
      const email = response.split('-security-')[1];
      const account_name = response.split('-security-')[0];
  
      const { merchant_order_id, payment_type, external_reference } = req.query;

      await conection('purchases').insert({
        id: merchant_order_id,
        account_name,
        payment_type,
        email,
        status,
        productId: external_reference,
        createdAt: getDate(new Date()),
        approvedAt: status == 'success' ? getDate(new Date()) : "N/A"
      });

      if (status == "success") {
        io.emit('activate-product-web', {
          product_id: external_reference,
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