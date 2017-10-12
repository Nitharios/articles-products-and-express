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
    if (products.create(req.body)) return res.redirect('/products');
    else return res.redirect('/articles/new');
  });

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;

    if (products.verify(id)) { 
      let data = products.retrieve(id);

      return res.render('index', {
        products : {
          product: true,
          name : data.name,
          price : data.price,
          inventory : data.inveotry
        }
      })
    };
    // I bet this will break...I think I'm wrong
    } else {
      return res.redirect(`/products`);
    }
  })

  .put((req, res) => {
    let id = req.params.id;

    if (products.edit(req.body) return res.redirect(`/products/${id}`);
    else return res.redirect(`/products/${id}/edit`);
    // console.log(products.listAll());
  })

  .delete((req, res) => {
    let id = req.params.id;

    if (products.remove(id)) return res.redirect('/products');
    else return res.redirect(`/products/${id}`);
  });

router.route('/:id/edit')
  .get((req, res) => {
    let targetItem = products.verify(req.params.title);

    if (targetItem) { 
      let data = products.retrieve(req.params.title);

      return res.render('index', {
        products : {
          product: true,
          edit : true,
          id : data.id,
          body : data.body,
          author : data.author
        }
      });
    
    } else {

      return res.redirect(`/products/${id}`);
    }
  });


module.exports = router;