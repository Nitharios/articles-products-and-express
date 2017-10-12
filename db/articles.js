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

  locate(title) {
    console.log('one', title)
    for (let i = 0; i < this._articleList.length; i++) {
      console.log('two', this._articleList[i].title)
      if (this._articleList[i].title === title) return i;
    }
    // returns a reference to location of title
    // return this._articleList.findIndex(element => {
    //   return element.title === title;
    return false;
    // if (this._articleList.hasOwnProperty(title)) return this._articleList[title];
    // else return false;
  }

  edit(data, item) {

    if (!item) {
      return false;

    } else {
      if (data.title) {
        item.title = data.title;
        item.urlTitle = encodeURI(data.title);
      }
      if (data.body) item.body = data.body;
      if (data.author) item.author = data.author;

      return true;
    }
  }

  remove(title) {

    if (this.locate(title)) {
      this.locate(title) = {};
      return true;

    } else {
     
      return false;
    }
  }
}

module.exports = Articles;