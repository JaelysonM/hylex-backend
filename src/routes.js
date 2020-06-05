const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const PurchasesController = require('./controller/web/PurchasesController');
const CheckoutController = require('./controller/web/CheckoutController');
const IpnController = require('./controller/web/IpnController');
const UserPurchasesController = require('./controller/web/UserPurchasesController');

const routes = express.Router();

const crypto = require('crypto');

/*
  Checkout controller
  Method: POST
  Uses > Is necessary 'account_name'=query ; 'productId'=params ; full body
*/


routes.post('/api/payments/checkout',celebrate({
  [Segments.QUERY]: Joi.object().keys({
    account_name: Joi.string().required(),
    type: Joi.string().required().equal('web').equal('debug')
    }),
  [Segments.BODY]: Joi.object().keys({
    info: {
      email: Joi.string().required().email()
    },
    items: Joi.array().items({
      productId: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      quantity: Joi.number().required(),
      title: Joi.string().required(),
      price: Joi.number().required()

    })
  }).unknown(),
}), CheckoutController.store);
/*
  Status callback controller
  Method: GET
  Uses > Return de purchase status and compute based in the status
*/

routes.post('/api/payments/ipn/:encryptedData', 
celebrate({
  [Segments.QUERY]: Joi.object({
    topic: Joi.string().default(null),
    authorize: Joi.string().required(),
    id: Joi.string().default(null),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    encryptedData: Joi.string().required(),
  }).unknown(),
})
,IpnController.store)

routes.get('/api/callback/:encryptedData', celebrate(
  {
    [Segments.PARAMS]: Joi.object().keys({
      encryptedData: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      merchant_order_id: Joi.required(),
      status: Joi.string().required().equal('success').equal('pending').equal('failure')
    }).unknown()

  }
), (req, res) => res.redirect(process.env.URL_CALLBACK));

/*
  Purchases controller
  Method: GET,DELETE
*/
routes.get('/api/payments/purchases', celebrate({
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  }).unknown()
}), PurchasesController.index);

routes.get('/api/payments/purchases/user/:username', celebrate({
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    username: Joi.string().required()
  })
}), UserPurchasesController.index);

routes.delete('/api/payments/purchases/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  }).unknown()
}),
  PurchasesController.delete);

module.exports = routes;