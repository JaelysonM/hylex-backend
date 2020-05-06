const MercadoPago = require('mercadopago');
const { encrypt } = require('../../services/encryptUtils');

const { getFullUrl } = require('../../services/getFullURL');

const { localStorage } = require('../../services/localStorage');

const crypto = require('crypto');

module.exports = {
  async store(req, res) {

    MercadoPago.configure({
      sandbox: process.env.SANDBOX == 'true' ? true : false,
      access_token: process.env.MP_ACCESS_TOKEN
    })

    const { email, description, price, title } = req.body;
    const { productId } = req.params;
    const { quantity = 1, account_name } = req.query;
    const { encryptedData, iv } = encrypt(`${account_name}-security-${email}`);
    const token = crypto.randomBytes(15).toString("HEX");
    
    const purchaseOrder = {
      items: [
        item = {
          id: productId,
          title,
          description,
          quantity,
          currency_id: 'BRL',
          unit_price: parseFloat(price)
        }
      ],
      payer: {
        email: email,
      },
      notification_url: "http://177.54.149.136:3333/ipn?authorize=" + token,
      auto_return: "all",
      external_reference: productId,
      back_urls: {
        success: getFullUrl(req) + `/payments/success/${encryptedData}/${iv}`,
        pending: getFullUrl(req) + `/payments/pending/${encryptedData}/${iv}`,
        failure: getFullUrl(req) + `/payments/failure/${encryptedData}/${iv}`,
      }
    }

    try {
      const preference = await MercadoPago.preferences.create(purchaseOrder);

      return res.redirect(`${preference.body.init_point}`);

    } catch (err) { return res.json(err.message); }
  }

}

