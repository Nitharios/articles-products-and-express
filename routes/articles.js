/* jshint esversion:6 */
const express = require('express');
const router = express.Router();

const Articles = require('../db/articles');
const articles = new Articles();

router.route('/')
  .get((req, res) => {
    res.send('Hello World!');
  })

  .post((req, res) => {
    res.send('Hello World!');
  });

router.route('/:title')
  .put((req, res) => {
    res.send('Hello World');
  })

  .delete((req, res) => {
    res.send('Hello World!');
  });

module.exports = router;