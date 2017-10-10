/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const hbs = require('express-handlebars');

const Articles = require('../db/articles');
const articles = new Articles();

const validReq = { "success" : true };
const invalidReq = { "success" : false };

router.route('/')
  .get((req, res) => {
    res.render(''/*../views/index.hbs*/);
  })

  .post((req, res) => {
    if (articles.create(req.body)) return res.json(validReq)/*res.redirect('/articles')*/;
    else return res.json(invalidReq)/*res.redirect('/articles/new')*/;
  });

router.route('/:title')
  .get((req, res) => {
    res.render(''/*../views/article.hbs*/);
  })

  .put((req, res) => {
    let articleTitle = req.body.title;

    if (articles.find(articleTitle)) {
      let targetItem = articles.find(articleTitle);
      
      articles.edit(req.body, targetItem);
      return res.json(validReq);
      
    } else {

      return res.json(invalidReq)/*res.redirect('/articles/${title}/edit')*/;
    }
  })

  .delete((req, res) => {
    let articleTitle = req.body.title;

    if (articles.find(articleTitle)) {

      articles.remove(articleTitle);
      return res.json(validReq);

    } else {

      return res.json(invalidReq); 
    }
  });

module.exports = router;