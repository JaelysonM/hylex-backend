const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const PurchasesController = require('./controller/web/PurchasesController');
const StatusController = require('./controller/web/StatusController');
const CheckoutController = require('./controller/web/CheckoutController');
const IpnController = require('./controller/web/IpnController');

const routes = express.Router();

const crypto = require('crypto');

/*
  Checkout controller
  Method: POST
  Uses > Is necessary 'account_name'=query ; 'productId'=params ; full body
*/


routes.post('/payments/checkout/:productId',celebrate({

  [Segments.QUERY]: Joi.object().keys({
    quantity: Joi.number().default(1),
    account_name: Joi.string().required()
  }),
  [Segments.PARAMS]: Joi.object().keys({
    productId: Joi.string().required()
  }),
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    title: Joi.string().required(),
  }),
}), CheckoutController.store);
/*
  Status callback controller
  Method: GET
  Uses > Return de purchase status and compute based in the status
*/
routes.post('/ipn', (req,res) => {

  console.log('');
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
  console.log(req.headers);
  console.log(req.cookies);
  console.log('');
  return res.json('sucesso').status(200);
})
/*
routes.post('/ipn', celebrate(
  {
    [Segments.QUERY]: Joi.object({
      authorize: Joi.string().required(),
      id: Joi.number().required(),
     }).unknown()
    
  }
 ), IpnController.store)
*/
routes.get('/payments/:status/:encryptedData/:iv',celebrate(
 {
   [Segments.PARAMS]: Joi.object().keys({
    status: Joi.string().required().equal('success').equal('pending').equal('failure'),
    encryptedData: Joi.string().required(),
    iv: Joi.string().required(),
   }).unknown(),
   [Segments.QUERY]: Joi.object().keys({
    merchant_order_id: Joi.number().required(),
    payment_type: Joi.string().required(),
    collection_id: Joi.number().required(),
    external_reference: Joi.string().required()
   }).unknown()
   
 }
), StatusController.store);

/*

[Segments.QUERY]: Joi.object().keys({
    merchant_order_id: Joi.number().required(),
    payment_type: Joi.string().required(),
    collection_id: Joi.number().required(),
    collection_status: Joi.string().required(),
    merchant_account_id: Joi.string().required()
   })

*/
/*
  Purchases controller
  Method: GET,DELETE
*/
routes.get('/payments/purchases', celebrate({
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  })
}), PurchasesController.index);

routes.delete('/payments/purchases/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  })
}),
  PurchasesController.delete);

module.exports = routes;