/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const products = require('./routes/products');

const port = process.env.PORT || 8888;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/products', products);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

