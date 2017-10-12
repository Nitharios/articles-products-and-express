/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Articles = require('../db/articles');
const articles = new Articles();

const validReq = { "success" : true };
const invalidReq = { "success" : false };

router.route('/')
  .get((req, res) => {
    res.render('index', { 
      articles : {
        list : articles.listAll() 
      }
    });
  });

router.route('/new')
  .get((req, res) => {
    res.render('index', { 
      articles : {
        new : true 
      }
    });
  })

  .post((req, res) => {
    if (articles.create(req.body)) return res.redirect('/articles')/*res.redirect('/articles')*/;
    else return res.redirect('/articles/new')/*res.redirect('/articles/new')*/;
  });

router.route('/:title')
  .get((req, res) => {
    let title = req.params.title;

    if (articles.verify(title)) { 
      let data = articles.retrieve(title);

      return res.render('index', { 
        articles : {
          article : true,
          title : data.title,
          body : data.body,
          author : data.author
        }
    });
    // I bet this will break...I think I'm wrong
    } else {

      return res.redirect(`/articles`);
    }
  })

  .put((req, res) => {
    let title = req.params.title;

    if (articles.edit(req.body)) return res.redirect(`/articles/${title}`);
    else return res.redirect(`/articles/${title}/edit`);
  })

  .delete((req, res) => {
    let title = req.params.title;
    console.log(title);

    if (articles.remove(title)) return res.redirect('/articles');
    else return res.redirect(`/articles/${title}`); 
  });

router.route('/:title/edit')
  .get((req, res) => {
    let targetItem = articles.verify(req.params.title);

    if (targetItem) { 
      let data = articles.retrieve(req.params.title);

      return res.render('index', { 
        articles : {
          article : true, 
          edit: true,
          title : data.title,
          body : data.body,
          author : data.author 
        }
      });
    // I bet this will break...I think I'm wrong
    } else {

      return res.redirect(`/articles/${title}`);
    }
  });


module.exports = router;