-- Don't forget semicolons!
\c nniosco

DROP USER IF EXISTS db_manager;
DROP DATABASE IF EXISTS articles_products;

CREATE USER db_manager;
CREATE DATABASE articles_and_products OWNER db_manager;

\c articles_and_products;

CREATE TABLE products(
  id          SERIAL        PRIMARY KEY,
  name        varchar(90)   NOT NULL,
  price       money         NOT NULL,
  inventory   integer       NOT NULL
);

CREATE TABLE articles(
  id          SERIAL        PRIMARY KEY,
  title       varchar(180)  NOT NULL,
  author      varchar(90)   NOT NULL,
  body        varchar(255)  NOT NULL
);

-- create indexes to make searching faster
CREATE UNIQUE INDEX author_idx ON articles(author);