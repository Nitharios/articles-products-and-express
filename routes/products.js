/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Products = require('../db/products');
const products = new Products();

const validReq = { "success" : true };
const invalidReq = { "success" : false };

// NEED TO USE PATH AND JOIN AND __dir FOR CROSS-PLATFORM
router.route('/')
  .get((req, res) => {
    res.render('index', { 
      products : {
        list : products.listAll()
      } 
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', {
      products : {
        new : true
      }
    });
  })

  .post((req, res) => {
    let createItem = products.create(req.body);
    console.log(req.body);

    // will eventually handle routes
    if (createItem) return res.redirect('/products');
    else return res.redirect('/products/new');
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;
    let targetItem = products.find(id);
    console.log(targetItem);

    if (targetItem) { 
      return res.render('index', { 
        products : {
          item : targetItem 
        }
    });
    // I bet this will break...I think I'm wrong
    } else {
      return res.redirect(`/products/${id}/edit`);
    }
  });

router.route('/:id/edit')
  .get((req, res) => {
    let id = req.params.id;
    let targetItem = products.find(id);

    if (targetItem) { 
      return res.render('index', {
        products : {
          edit : true,
          id : id,
          item : targetItem
        }
      });
    
    } else {

      return res.redirect(`/products/${id}`);
    }
  })

  .put((req, res) => {
    let id = req.params.id;
    let targetItem = products.find(id);

    if (products.edit(req.body, targetItem)) return res.redirect(`/products/${id}`);
    else return res.redirect(`/products/${id}/edit`);
    // console.log(products.listAll());
  })

  .delete((req, res) => {
    let id = req.params.id;

    if (products.remove(id)) return res.redirect('/products');
    else return res.redirect(`/products/${id}`);
  });

module.exports = router;