/* jshint esversion:6 */

class Articles {
  constructor() {
    this._articleList = [
      {
        title : 'Summertime Is For Everyone',
        body : 'Summertime is for everyone!',
        author : 'Somebody',
        urlTitle : 'Summertime%20Is%20For%20Everyone'
      },

      {
        title : 'Climate Change Is Real',
        body : 'IT IS REAL!',
        author : 'Scientist',
        urlTitle : 'Climate%20Change%20Is%20Real'
      }
    ];
  }

  listAll() {
    return this._articleList;
  }

  create(data) {

    if (this.locate(data.title)) return false;

    let articleInfo = {
      title : data.title,
      body : data.body,
      author : data.author,
      urlTitle : encodeURI(data.title)
    };

    this._articleList.push(articleInfo);
    console.log('articleList', this._articleList);
    return true;
  }
  // returns the index that the array is located at
  locate(title) {
    for (let i = 0; i < this._articleList.length; i++) {
      if (this._articleList[i].title === title) return this._articleList[i];
    }

    return false;
  }

  edit(data) {
    let index = locate(data.title);

    if (index > -1) {
      if (index.title) {
        this._articleList[i].title = data.title;
        this._articleList[i].urlTitle = encodeURI(data.title)
      }
      if (index.body) this._articleList[i].body = data.body;
      if (index.author) this._articleList[i].author = data.author;

      return true;
    }

    return false;
  }

  remove(data) {
    let index = locate(data.title);

    if (index > -1) {
      this._articleList.splice(index, 1);
      return true;
    }

    return false;
  }
}

module.exports = Articles;