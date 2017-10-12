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
    if (this.verify(data.title)) return false;

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
  // returns the index that the array is verifyd at
  verify(title) {
    return this._articleList.some(element => {
      return element.title === title;
    })

    return false;
  }

  locate(title) {
    return this._articleList.findIndex((element, index) => {
      return element.title === title;
    })
  }

  retrieve(title) {
    return this._articleList.find(element => {
      return element.title === title;
    })

    return false;
  }

  edit(data) {
    if (this.verify(data.title)) {
      let index = this.locate(data.title);
      let targetItem = this._articleList[index];

      if (data.title) {
        targetItem.title = data.title;
        targetItem.urlTitle = encodeURI(data.title);
      }
      if (data.body) targetItem.body = data.body;
      if (data.author) targetItem.author = data.author;
      
      return true;
    }

    return false;
  }

  remove(title) {
    console.log(title);
    if (this.verify(title)) {
      return this._articleList.filter((element) => {
        console.log('here', element);
        return element.title !== title;
      })
    }

    return false;
  }
}

module.exports = Articles;