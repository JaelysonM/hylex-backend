
const localStorage = require('../../services/localStorage');

const api = require('../../services/api');

const { decrypt } = require('../../services/encryptUtils');

const connection = require('../../database/connection');

const whenClear = ['pending_review_manual', 'pending_contingency']

module.exports = {
  async store(req, res) {

    let message = {
      message: `Bad request: we cannot identify this issue`,
      status: 500,
    };
    
    try {
      const { topic, authorize, id } = req.query;

      if (topic != null && topic == 'merchant_order' && localStorage.getItem(authorize) == null) {
        const { encryptedData} = req.params;

        const response = decrypt(encryptedData);
        const email = response.split('-security-')[1];
        const account_name = response.split('-security-')[0];

        const result = await api.get(`/merchant_orders/${id}?access_token=${process.env.MP_ACCESS_TOKEN}`);

        const { items } = result.data;

        await connection('purchases').insert({
          id,
          account_name,
          payment_type: 'WAITING',
          email,
          status: 'ORDERING',
          items: items.map((i) => i.id + ";" + i.quantity).join(', '),
          createdAt: new Date(),
          approvedAt: 'N/A',
          payment_id: '...'
        });

        localStorage.setItem(authorize, id);

        message = {
          message: `You have successfully created an order with id ${id}`,
          status: 200,
        }
      } else {
        if (localStorage.getItem(authorize) != null) {
          const data_id = req.query['data.id'];
          const result = await api.get(`/v1/payments/${data_id}?access_token=${process.env.MP_ACCESS_TOKEN}`);
          const { order, status_detail, payment_type_id, date_approved, id } = result.data;
          if (localStorage.getItem(authorize) == order.id) {

            if (!whenClear.includes(status_detail))
              localStorage.removeItem(authorize);


            if (status_detail == 'accredited') {
              await connection('purchases').update({ status: status_detail, payment_type: payment_type_id,payment_id: id,  approvedAt: date_approved }).where({ id: order.id });
            } else {
              await connection('purchases').update({ status: status_detail, payment_type: payment_type_id, payment_id: id,}).where({ id: order.id });
            }
            message = {
              message: `Success: Updated ${order.id} payment status.`,
              status: 200,
            }
          } else {
            message = {
              message: `Not authorized: Invalid link between order.id > ${authorize}`,
              status: 500,
            }
          }
        } else {
          message = {
            message: `Not found: There's not a order linked with token: ${authorize}`,
            status: 500,
          }
        }
      }

    } catch (err) {
      return res.redirect(`${process.env.URL_BAD_REQUEST}`);
    }
    return res.status(message.status);
  }
  ,
}