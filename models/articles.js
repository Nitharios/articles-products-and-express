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
    let uri = encodeURI(article.title);

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

  find(articleTitle) {
    let query = `SELECT id, title, author, body
                 FROM articles
                 WHERE title = ${articleTitle}`;

    return db.any(query)
      .catch((err) => {
        console.log(err);
      });
  }

  edit(articleTitle, article) {
    let query = `SELECT title, author, body, uri 
                 FROM articles
                 WHERE title = ${articleTitle}`;

    return db.any(query)
      .then((data) => {
        if (article.title) {
          let uri = encodeURI(article.title);

          db.any(`UPDATE articles SET title = '${article.title}' WHERE title = ${articleTitle}`);
          db.any(`UPDATE articles SET uri = '${uri}' WHERE title = ${articleTitle}`);
        }

        if (article.author) {
          db.any(`UPDATE articles SET author = '${article.author}' WHERE title = ${articleTitle}`);
        }

        if (article.body) {
          db.any(`UPDATE articles SET body = '${article.body}' WHERE title = ${articleTitle}`);
        }

        return this.find(articleTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  remove(articleTitle) {
    let query = `DELETE FROM articles
                 WHERE title = ${articleTitle}`;

    return db.any(query)
      .then((data) => {
        return this.find(articleTitle);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Articles;