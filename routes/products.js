/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');

const Products = require('../db/products');
const products = new Products();

router.route('/')
  .get((req, res) => {
  res.render(/*../views/products.hbs*/);
  })

  .post((req, res) => {
    console.log(req.body);
    products.create(req);
  });

module.exports = router;