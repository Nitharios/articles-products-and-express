/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');

const Products = require('../db/products');
const products = new Products();

const validReq = { "success" : true };
const invalidReq = { "success" : false };

router.route('/')
  .get((req, res) => {
  res.render(/*../views/products.hbs*/);
  })

  .post((req, res) => {
    console.log(req.body);
    
    if (products.create(req.body)) return res.json(validReq);
    else return res.json(invalidReq);
  });

router.route('/:id')
  .get((req, res) => {
    res.render(/*../views/products.hbs*/);
  })

  .put((req, res) => {
    let id = req.url.split('/')[1];
    let newInfo = products.find(id);

    products.edit(req.body, newInfo);
    // console.log(products.listAll());
  })

  .delete((req, res) => {

  });

module.exports = router;