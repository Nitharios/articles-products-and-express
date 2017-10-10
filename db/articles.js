/* jshint esversion:6 */

class Articles {
  constructor() {
    this._articleList = {};
    this._productNumber = 0;
  }

  create(data) {
    if (this.find(data.title)) return false;

    let articleInfo = {
      title : data.title,
      body : data.body,
      author : data.author,
      urlTitle : encodeURI(data.title)
    };

    this._articleList[articleInfo.title] = articleInfo;
    console.log('articleList', this._articleList);
    return true;
  }

  find(title) {
    // returns a reference to location of title
    if (this._articleList.hasOwnProperty(title)) return this._articleList[title];
    else return false;
  }

  edit(data, item) {
    if (data.title) {
      item.title = data.title;
      item.urlTitle = encodeURI(data.title);
    }
      
    if (data.body) item.body = author.body;
    if (data.author) item.author = data.author;
  
    return true;
  }
}

module.exports = Articles;