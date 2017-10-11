/* jshint esversion:6 */
const sanity = "You're not crazy!";
console.log(sanity);

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const products = require('./routes/products');
const articles = require('./routes/articles');

const port = process.env.PORT || 8888;

const app = express();
// I don't know what this does
app.engine('.hbs', hbs({
  // 'main.hbs' exists in views/layouts/
  defaultLayout : 'main',
  extname : '.hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  // 'home.hbs' exists in views/
  // will use the default layout 'main' to build HTML and then render the contents of 'home' in the {{body}} section of 'main'
  res.render('home');
});

app.use(bodyParser.urlencoded({ "extended" : true }));
// applies the methodOverride method to the method assigned to _method in the URL of a form submission page
app.use(methodOverride('_method'));

app.use('/products', products);
app.use('/articles', articles);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

