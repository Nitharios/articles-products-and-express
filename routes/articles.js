/* jshint esversion:6 */
const express = require('express');
const Products = require('../models/products');

const products = new Products();
const router = express.Router();

// handles returning entire table of products
router.route('/')
  .get((req, res) => {
    // listAll will return a Promise
    return products.listAll()
      .then((data) => {
        // console.log(data);
        res.render('partials/products/products', { data });
      });
  });

// handles adding a new product to table
router.route('/new')
  .get((req, res) => {
    res.render('partials/products/new');
  })
  .post((req, res) => {
    return products.create(req.body)
      .then((data) => {
        console.log('CREATED', data);
        res.redirect('/products');
      });
  });

// handles updating a product in the table
router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;

    return products.find(id)
      .then((data) => {
        // console.log('here', data);
        res.render('partials/products/product', { data });
      });
  })
  .put((req, res) => {
    let id = req.params.id;

    return products.edit(id, req.body)
      .then((data) => {
        console.log('EDITED item', id, data);
        res.redirect(`/products/${id}`);
      });
  })
  .delete((req, res) => {
    let id = req.params.id;

    return products.remove(id)
      .then((data) => {
        console.log('DELETED item', id, { data });
        res.redirect('/products');
      });
  });

// handles directing a product to edit
router.route('/:id/edit')
  .get((req, res) => {
    let id = req.params.id;

    return products.find(id)
      .then((data) => {
        res.render('partials/products/edit', { data });
      });
  });

module.exports = router;