/* jshint esversion:6 */
const express = require('express');
const Articles = require('../models/articles');

const qs = require('querystring');

const articles = new Articles();
const router = express.Router();

// handles returning entire table of articles
router.route('/')
  .get((req, res) => {
    // listAll will return a Promise
    return articles.listAll()
      .then((data) => {
        // console.log(data);
        res.render('partials/articles/articles', { data });
      });
  });

// handles adding a new article to table
router.route('/new')
  .get((req, res) => {
    res.render('partials/articles/new');
  })
  .post((req, res) => {
    return articles.create(req.body)
      .then((data) => {
        console.log('CREATED', data);
        res.redirect('/articles');
      });
  });

// handles updating a article in the table
router.route('/:id')
  .get((req, res) => {
    let id = req.params.id;

    return articles.find(id)
      .then((data) => {
        // console.log('here', data);
        res.render('partials/articles/article', { data });
      });
  })
  .put((req, res) => {
    let id = req.params.id;

    return articles.edit(id, req.body)
      .then((data) => {
        console.log('EDITED item', id, data);
        res.redirect(`/articles/${id}`);
      });
  })
  .delete((req, res) => {
    let id = req.params.id;

    return articles.remove(id)
      .then((data) => {
        console.log('DELETED item', id, { data });
        res.redirect('/articles');
      });
  });

// handles directing a article to edit
router.route('/:id/edit')
  .get((req, res) => {
    let id = req.params.id;

    return articles.find(id)
      .then((data) => {
        res.render('partials/articles/edit', { data });
      });
  });

module.exports = router;