/* jshint esversion:6 */

class Articles {
  constructor() {
    this._articleList = {};
    this._productNumber = 0;
  }

  create(data) {

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
}

module.exports = Articles;