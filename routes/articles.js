/* jshint esversion:6 */
const express = require('express');

const fixedEncodeURI = require('../scripts/fixedEncodeURI');
const Articles = require('../models/articles');

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
router.route('/:uri')
  .get((req, res) => {
    let uri = fixedEncodeURI(req.params.uri);

    return articles.find(uri)
      .then((data) => {
        // console.log('here', data);
        res.render('partials/articles/article', { data });
      });
  })
  .put((req, res) => {
    let uri = fixedEncodeURI(req.params.uri);

    return articles.edit(uri, req.body)
      .then((data) => {
        console.log('EDITED item', title, data);
        res.redirect(`/articles/${uri}`);
      });
  })
  .delete((req, res) => {
    let uri = fixedEncodeURI(req.params.uri);

    return articles.remove(uri)
      .then((data) => {
        console.log('DELETED item', uri, { data });
        res.redirect('/articles');
      });
  });

// handles directing a article to edit
router.route('/:uri/edit')
  .get((req, res) => {
    let uri = fixedEncodeURI(req.params.uri);
    console.log(uri);

    return articles.find(`${uri}`)
      .then((data) => {
        console.log('edit', data);
        res.render('partials/articles/edit', { data });
      });
  });

module.exports = router;