/* jshint esversion:6 */
const pgp = require('pg-promise')();
const port = 5432;
// this data can go in another file and then be required in since Products AND Articles will use this
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

  listAll() {
    let query = `SELECT id, name, price, inventory 
    FROM products;`;
    
    return db.any(query)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  create(product) {
    console.log(product);
    let name = product.name;
    let price = Number(product.price);
    let inventory = Number(product.inventory);

    if(!name || !price || !inventory) {
      throw new Error('Invalid Product');
    }

    let query = `INSERT INTO products (name, price, inventory)
                 VALUES($1, $2, $3)`;
    let params = [name, price, inventory];
    return db.any(query, params); 
  }

  find(id) {
    let query = `SELECT name, price, inventory
                 FROM products
                 WHERE id = ${id}`;
    return db.any(query);
  }

  edit(productId, product) {
    console.log(product);
    let name = product.name;
    let price = Number(product.price);
    let inventory = Number(product.inventory);
    let setString = '';

    if (name) setString += `name = ${name}`; 
    if (price) setString += `price = ${price}`;
    if (inventory) setString += `inventory = ${inventory}`; 

    let query = `UPDATE products
                 SET 
                 WHERE id = ${productId}`;
  }
}

module.exports = Products;