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

    return db.any(query, params)
    .catch((err) => {
      console.log(err);
    }); 
  }

  find(productId) {
    let query = `SELECT name, price, inventory
                 FROM products
                 WHERE id = ${productId}`;

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
        db.any('UPDATE products SET name = $1 WHERE id = $2', [product.name, productID]);
      }

      if (product.price) {
        db.any('UPDATE products SET price = $1 WHERE id = $2', [product.price, productID]);
      }

      if (product.inventory) {
        db.any('UPDATE products SET inventory = $1 WHERE id = $2', [product.inventory, productID]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  remove(productId) {
    let query = `DELETE FROM products
                 WHERE id = ${productId}`;

    return db.any(query)
    .catch((err) => {
      console.log(err);
    });
  }
}

module.exports = Products;