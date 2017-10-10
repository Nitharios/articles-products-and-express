/* jshint esversion:6 */
// let productList = {};
// let productNumber = 0;

class Products {
  constructor() {
    this._productList = {};
    this._productNumber = 0;
  }
  // will return full productlist
  listAll () {
    return this._productList;
  }
  // will save data from req body
  create(data) {

    let productInfo = {
      name : data.name,
      price : Number(data.price),
      inventory : Number(data.inventory)
    };

    for (let i in this._productList) {
      if (this._productList[i].name === productInfo.name) return false;
    }

    this._productNumber += 1;
    this._productList[this._productNumber] = productInfo;
    console.log(this._productList);
    return true;
  }

  // will return reference to location of id through coersion
  find(id) {
    if (this._productList.hasOwnProperty(id)) return this._productList[id];
  }

  // will edit a product based on id
  edit(data, newInfo) {
    if (data.name) newInfo.name = data.name;
    if (data.price) newInfo.price = data.price;
    if (data.inventory) newInfo.inventory = data.inventory;

    return newInfo;
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