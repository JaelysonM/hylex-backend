const MercadoPago = require('mercadopago');
const { encrypt } = require('../../services/encryptUtils');

const { getFullUrl } = require('../../services/getFullURL');


const crypto = require('crypto');

module.exports = {
  async store(req, res) {

    MercadoPago.configure({
      sandbox: process.env.SANDBOX == 'true' ? true : false,
      access_token: process.env.MP_ACCESS_TOKEN
    })
    const { type } = req.query;
    const items = req.body.items.map(item => {
      return {
        id: item.productId,
        title: item.title,
        description: item.description,
        quantity: item.quantity,
        currency_id: 'BRL',
        unit_price: parseFloat(item.price),
        category_id: 'games'
      }
    })

    const { email } = req.body.info;
    const { account_name } = req.query;
    const encryptedData = encrypt(`${account_name}-security-${email}`);
    const token = crypto.randomBytes(15).toString("HEX");

    const purchaseOrder = {
      items,
      payer: {
        email,
      },
      notification_url: getFullUrl(req) + `/api/payments/ipn/${encryptedData}?authorize=${token}`,
      auto_return: "all",
      payment_methods: {
        excluded_payment_methods: [
            {
                id: "pec"
            }
        ],
        installments: 4,
      },
      external_reference: token,
      back_urls: {
        success: getFullUrl(req) + `/api/callback/${encryptedData}?status=success`,
        pending: getFullUrl(req) + `/api/callback/${encryptedData}?status=pending`,
        failure: getFullUrl(req) + `/api/callback/${encryptedData}?status=failure`,
      }
    }

    try {
      const preference = await MercadoPago.preferences.create(purchaseOrder);
      if (type == 'debug') {
        return res.redirect(`${preference.body.init_point}`);
      } else {
        return res.json({ url: `${preference.body.init_point}`});
      }

    } catch (err) { console.log(err); return res.redirect(`${process.env.URL_BAD_REQUEST}`); }


  }

}

