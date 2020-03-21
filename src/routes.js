const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/ClientController');


// Products
routes.get('/itens',ProductController.index);
routes.get('/itens/:id',ProductController.show);
routes.post('/itens', ProductController.store);
routes.put('/itens/:id', ProductController.update);
routes.delete('/itens/:id', ProductController.destroy);


module.exports= routes;