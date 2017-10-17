/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Products = require('../models/products');
const products = new Products();

router.route('/')
.get((req, res) => {
  // listAll will return a Promise
  return products.listAll()
  .then((data) => {
    res.json(data);
  });
});

router.route('/new')
.get((req, res) => {
  res.render('index');
})
.post((req, res) => {
  return products.create(req.body)
  .then((data) => {
    res.json(data);
  });
});

module.exports = router;