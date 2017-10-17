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

class Articles {

  listAll() {
    let query = `SELECT id, title, author, body
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
    let query = `INSERT INTO articles (title, author, body)
                 VALUES($1, $2, $3)`;
    let params = [title, author, body];

    return db.any(query, params)
      .then((data) => {
        return article;
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  find(articleID) {
    let query = `SELECT id, title, author, body
                 FROM articles
                 WHERE id = ${articleID}`;

    return db.any(query)
      .catch((err) => {
        console.log(err);
      });
  }

  edit(articleID, article) {
    let query = `SELECT title, author, body 
                 FROM articles
                 WHERE id = ${articleID}`;

    return db.any(query)
      .then((data) => {
        if (article.title) {
          db.any(`UPDATE articles SET title = '${article.title}' WHERE id = ${articleID}`);
        }

        if (article.author) {
          db.any(`UPDATE articles SET author = '${article.author}' WHERE id = ${articleID}`);
        }

        if (article.body) {
          db.any(`UPDATE articles SET body = '${article.body}' WHERE id = ${articleID}`);
        }

        return this.find(articleID);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(articleID) {
    let query = `DELETE FROM articles
                 WHERE id = ${articleID}`;

    return db.any(query)
      .then((data) => {
        return this.find(articleID);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Articles;