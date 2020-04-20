const express = require('express');

const { celebrate, Segments, Joi } = require('celebrate');

const PurchasesController = require('./controller/PurchasesController');
const StatusController = require('./controller/StatusController');
const CheckoutController = require('./controller/CheckoutController');

const routes = express.Router();

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
routes.get('/payments/:status/:encryptedData/:iv',celebrate(
 {
   [Segments.PARAMS]: Joi.object().keys({
    status: Joi.string().required().equal('success').equal('pending').equal('failure'),
    encryptedData: Joi.string().required(),
    iv: Joi.string().required(),
   }),
   [Segments.QUERY]: Joi.object().keys({
    merchant_order_id: Joi.number().required(),
    payment_type: Joi.string().required(),
    collection_id: Joi.number().required(),
    collection_status: Joi.string().required()
   }),
   
 }
), StatusController.store);


/*
  Purchases controller
  Method: GET,DELETE
*/
routes.get('/payments/purchases', celebrate({
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  }).unknown()
}), PurchasesController.index);

routes.delete('/payments/purchases/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    manage_token: Joi.string().required()
  }).unknown()
}),
  PurchasesController.delete);

module.exports = routes;