/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const express = require('express');
const port = process.env.PORT || 8888;

const app = express();

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});