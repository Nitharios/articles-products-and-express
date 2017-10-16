/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Products = require('../handlers/products');
const products = new Products();

router.route('/')
  .get((req, res) => {
    res.render('Hello from Products'
      // 'index', {
      // test : 'testest'
    // }
    );
  });

module.exports = router;