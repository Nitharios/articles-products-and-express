/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');
const articles = require('./routes/articles');

const port = process.env.PORT || 8888;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.urlencoded({ "extended" : true }));

app.use('/products', products);
app.use('/articles', articles);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

