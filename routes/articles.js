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
    let targetItem = articles.locate(title);
    console.log(targetItem);
    if (targetItem) { 

      return res.render('index', { 
        articles : {
          item : targetItem 
        }
    });
    // I bet this will break...I think I'm wrong
    } else {
      return res.redirect(`/articles`);
    }
  })

  .put((req, res) => {
    // title references the title passed in by the url
    let title = req.params.title;
    console.log('one', title);
    // target item references the location of the item to edit
    let targetItem = articles.locate(title);
    console.log('two', targetItem);

    if (articles.edit(req.body, targetItem)) return res.redirect(`/articles/${title}`);
    else return res.redirect(`/articles/${title}/edit`);
  })

  .delete((req, res) => {
    let title = req.params.title;

    if (articles.remove(title)) return res.redirect('/articles');
    else return res.redirect(`/articles/${title}`); 
  });

router.route('/:title/edit')
  .get((req, res) => {
    let title = req.params.title;
    let targetItem = articles.locate(title);

    if (targetItem) { 
      return res.render('index', { 
        articles : {
          edit: true,
          title : title,
          item : targetItem 
        }
    });
    // I bet this will break...I think I'm wrong
    } else {

      return res.redirect(`/articles/${title}`);
    }
  });


module.exports = router;