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

module.exports = db;