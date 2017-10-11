/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');

const Products = require('../db/products');
const products = new Products();

const validReq = { "success" : true };
const invalidReq = { "success" : false };

// NEED TO USE PATH AND JOIN AND __dir FOR CROSS-PLATFORM
router.route('/')
  .get((req, res) => {
    res.render('index', { products : products.listAll() });
  })

  .post((req, res) => {
    console.log(req.body);

    // will eventually handle routes
    if (products.create(req.body)) return res.redirect(200, '/products');
    else return res.redirect(200, '/products/new');
  });

router.route('/:id')
  .get((req, res) => {
    res.render(/*../views/product.hbs*/);
  })

  .put((req, res) => {
    let id = req.body.id;
    let targetItem = products.find(id);

    if (products.edit(req.body, targetItem)) return res.redirect(200, `/products/${id}`);
    else return res.redirect(200, `/products/${id}/edit`);
    // console.log(products.listAll());
  })

  .delete((req, res) => {
    let id = req.url.split('/')[1];

    if (products.remove(id)) return res.redirect(200, '/products');
    else return res.redirect(200, `/products/${id}`);
  });

module.exports = router;