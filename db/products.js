/* jshint esversion:6 */
// let productList = {};
// let productNumber = 0;

class Products {
  constructor() {
    this._productList = {};
    this._productNumber = 0;
  }
  // will return full product list
  listAll () {
    return this._productList;
  }
  // will save data from req.body
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