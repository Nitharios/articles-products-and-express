/* jshint esversion:6 */
const pgp = require('pg-promise')();
const port = process.env.PORT || 8888;
const database = 'articles_and_products';
const user = 'db_manager';
const connect = {
  host : 'localhost',
  port : port,
  database : database,
  user : user
};

const db = pgp(connect);

class Products {

  create(product) {
    let name = product.name;
    let price = product.price;
    let inventory = product.inventory;

    if(!name || !price || !inventory) {
      throw new Error('Invalid Product');
    }

    let query = 'INSERT INTO products VALUES($1, $2, $3)';
    let params = [name, price, inventory];
    return db.any(query, params); 
  }
}

module.exports = Products;