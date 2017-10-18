/* jshint esversion:6 */
const pgp = require('pg-promise')();
const fixedEncodeURI = require('../scripts/fixedEncodeURI');

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

class Articles {

  listAll() {
    let query = `SELECT id, title, author, body, uri
                 FROM articles
                 ORDER BY id ASC;`;
    
    return db.any(query)
      .catch((err) => {
        console.log(err);
      });
  }

  create(article) {

    if(!article.title || !article.author || !article.body) {
      throw new Error('Invalid Article');
    }

    let title = article.title;
    let author = article.author;
    let body = article.body;
    let uri = fixedEncodeURI(article.title);

    let query = `INSERT INTO articles (title, author, body, uri)
                 VALUES($1, $2, $3, $4)`;
    let params = [title, author, body, uri];

    return db.any(query, params)
      .then((data) => {
        return article;
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  find(articleURI) {
    let query = `SELECT id, title, author, body, uri
                 FROM articles
                 WHERE uri = '${articleURI}'`;

    return db.any(query)
      .catch((err) => {
        console.log('ERROR', err);
      });
  }

  edit(articleURI, article) {
    let query = `SELECT title, author, body, uri 
                 FROM articles
                 WHERE uri = '${articleURI}'`;

    return db.any(query)
      .then((data) => {
        if (article.title) {
          let uri = fixedEncodeURI(article.title);

          db.any(`UPDATE articles SET title = '${article.title}' WHERE uri = '${articleURI}'`);
          db.any(`UPDATE articles SET uri = '${uri}' WHERE uri = '${articleURI}'`);
        }

        if (article.author) {
          db.any(`UPDATE articles SET author = '${article.author}' WHERE uri = '${articleURI}'`);
        }

        if (article.body) {
          db.any(`UPDATE articles SET body = '${article.body}' WHERE URI = '${articleURI}'`);
        }

        return this.find(articleURI);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(articleURI) {
    let query = `DELETE FROM articles
                 WHERE uri = '${articleURI}'`;

    return db.any(query)
      .then((data) => {
        return this.find(articleURI);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Articles;