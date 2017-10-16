/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Products = require('../models/products');
const products = new Products();

router.route('/')
  .get((req, res) => {
    let productsList = products.listAll();
    res.json(productsList
      // 'index', {
      // test : 'testest'
    // }
    );
  });

module.exports = router;