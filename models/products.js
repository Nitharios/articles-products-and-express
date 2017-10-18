/* jshint esversion:6 */
const pgp = require('pg-promise')();
const db = require('../scripts/pg-promise');

class Products {

  listAll() {
    let query = `SELECT id, name, price, inventory 
                 FROM products
                 ORDER BY id ASC;`;
    
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
                 VALUES(${name}, ${price}, ${inventory})`;
    // let params = [name, price, inventory];
    return db.any(query)
      .then((data) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  find(productID) {
    let query = `SELECT id, name, price, inventory
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
          db.any(`UPDATE products SET name = '${product.name}' WHERE id = ${productID}`);
        }

        if (product.price) {
          db.any(`UPDATE products SET price = '${product.price}' WHERE id = ${productID}`);
        }

        if (product.inventory) {
          db.any(`UPDATE products SET inventory = '${product.inventory}' WHERE id = ${productID}`);
        }

        return this.find(productID);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(productID) {
    let query = `DELETE FROM products
                 WHERE id = ${productID}`;

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