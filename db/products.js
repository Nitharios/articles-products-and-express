/* jshint esversion:6 */
// let productList = {};
// let productNumber = 0;

class Products {
  constructor() {
    this._productList = {
      '1' : {
        'id' : '1',
        'name' : 'potato chips',
        'price' : 2,
        'inventory' : 20
      },

      '2' : {
        'id' : '2',
        'name' : 'watermelon',
        'price' : 10,
        'inventory' : 5
      }
    };
    this._productNumber = 2;
  }
  // will return full product list
  listAll () {
    return this._productList;
  }
  // will save data from req.body
  create(data) {
    if (this._productList.hasOwnProperty(data.name)) return false;

    let productInfo = {
      name : data.name,
      price : Number(data.price),
      inventory : Number(data.inventory)
    };

    this._productNumber += 1;
    this._productList[this._productNumber] = productInfo;
    console.log(this._productList);
    return true;
  }

  // will return reference to location of id through coersion
  find(id) {
    if (this._productList.hasOwnProperty(id)) return this._productList[id];
    else return false;
  }

  // will edit a product based on id
  edit(data, item) {
    if (data.name) item.name = data.name;
    if (data.price) item.price = data.price;
    if (data.inventory) item.inventory = data.inventory;

    return true;
  }

  // will delete a product based on id
  remove(id) {
    if (this._productList.hasOwnProperty(id)) {
      this._productList[id] = {};
      return true;

    } else {
     
      return false;
    }
  }
} 

module.exports = Products;

  // will verify that the req body is a valid format
  // verify(data) {
  //   try {
  //     return this.create(data);
    
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }