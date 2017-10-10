/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');

const Articles = require('../db/articles');
const articles = new Articles();

router.route('/')
  .get((req, res) => {
    res.render(/*../views/index.hbs*/);
  })

  .post((req, res) => {
    if (articles.create(req.body)) return res.redirect('/articles');
    else return res.redirect('/articles/new');
  });

router.route('/:title')
  .get((req, res) => {
    res.render(/*../views/article.hbs*/);
  })
  .put((req, res) => {
    res.send('Hello World');
  })

  .delete((req, res) => {
    res.send('Hello World!');
  });

module.exports = router;