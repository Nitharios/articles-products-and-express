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
      .catch((err) => {
        console.log(err);
      });
  }

  create(product) {

    if(!product.name || !product.price || !product.inventory) {
      throw new Error('Invalid Product');
    }

    let name = product.name;
    let price = Number(product.price);
    let inventory = Number(product.inventory);
    let query = `INSERT INTO products (name, price, inventory)
                 VALUES($1, $2, $3)`;
    let params = [name, price, inventory];

    return db.any(query, params)
      .then((data) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  find(productID) {
    let query = `SELECT name, price, inventory
                 FROM products
                 WHERE id = ${productID}`;

    return db.any(query)
      .catch((err) => {
        console.log(err);
      });
  }

  edit(productID, product) {
    let query = `SELECT name, price, inventory 
                 FROM products
                 WHERE id = ${productID}`;

    return db.any(query)
      .then((data) => {
        if (product.name) {
          db.any(`UPDATE products SET name = ${product.name} WHERE id = ${productID}`);
        }

        if (product.price) {
          db.any(`UPDATE products SET price = ${product.price} WHERE id = ${productID}`);
        }

        if (product.inventory) {
          db.any(`UPDATE products SET inventory = ${product.inventory} WHERE id = ${productID}`);
        }

        return this.find(productID);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(productId) {
    let query = `DELETE FROM products
                 WHERE id = ${productId}`;

    return db.any(query)
      .then((data) => {
        return this.find(productID);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Products;