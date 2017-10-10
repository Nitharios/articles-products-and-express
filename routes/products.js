/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Products = require('../db/products');
const products = new Products();

router.route('/')
  .get((req, res) => {
  res.send('Hello World!');
})

  .post((req, res) => {
  product.create(req);
});

module.exports = router;