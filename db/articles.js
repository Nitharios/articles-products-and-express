/* jshint esversion:6 */

class Articles {
  constructor() {
    this._articleList = {
      'Summertime Is For Everyone' : {
        title : 'Summertime Is For Everyone',
        body : 'Summertime is for everyone!',
        author : 'Somebody',
        urlTitle : 'Summertime%20Is%20For%20Everyone'
      },

      'Climate Change Is Real' : {
        title : 'Climate Change Is Real',
        body : 'IT IS REAL!',
        author : 'Scientist',
        urlTitle : 'Climate%20Change%20Is%20Real'
      }
    };
  }

  listAll() {
    return this._articleList;
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
      
    if (data.body) item.body = data.body;
    if (data.author) item.author = data.author;
  
    console.log(this._articleList);
    return true;
  }

  remove(title) {
    if (this._articleList.hasOwnProperty(title)) {
      this._articleList[title] = {};
      return true;

    } else {
     
      return false;
    }
  }
}

module.exports = Articles;