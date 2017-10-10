/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const express = require('express');
const hbs = require('express-handlebars');

const port = process.env.PORT || 8888;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

