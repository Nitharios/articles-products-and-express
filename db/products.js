/* jshint esversion:6 */
class Products {
  constructor() {
    this._productList = [
      {
        'id' : 1,
        'name' : 'potato chips',
        'price' : 2,
        'inventory' : 20
      },

      {
        'id' : 2,
        'name' : 'watermelon',
        'price' : 10,
        'inventory' : 5
      }
    ];

    this._productNumber = 2;
  }
  // will return full product list
  listAll () {
    return this._productList;
  }
  // will save data from req.name
  create(data) {
    if (this.verify(data.id)) return false;

    this._productNumber += 1;

    let productInfo = {
      id : this._productNumber,
      name : data.name,
      price : Number(data.price),
      inventory : Number(data.inventory)
    };

    this._productList.push(productInfo);
    return true;
  }

  // will return reference to location of id through coersion
  verify(id) {
    return this._productList.some(element => {
      return element.id === Number(id);
    })

    return false;
  }

  locate(id) {
    return this._productList.findIndex((element, index) => {
      return element.id === Number(id);
    })
  }

  retrieve(id) {
    return this._productList.find(element => {
      return element.id === Number(id);
    })

    return false;
  }

  // will edit a product based on id
  edit(data) {
    if (this.verify(data.id)) {
      let index = this.locate(data.id);
      let targetItem = this._productList[index];

      if (data.id) targetItem.id = data.id;
      if (data.name) targetItem.name = data.name;
      if (data.price) targetItem.price = data.price;
      if (data.inventory) targetItem.inventory = data.inventory;
      
      return true;
    }

    return false;
  }

  // will delete a product based on id
  remove(id) {
    if (this.verify(id)) {
      let index = this.locate(id);

      return this._productList.splice(index, 1);
    }

    return false;
  }
} 

module.exports = Products;