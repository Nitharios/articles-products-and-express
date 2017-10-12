/* jshint esversion:6 */

class Products {
  constructor() {
    this._productList = [
      {
        'id' : '1',
        'name' : 'potato chips',
        'price' : 2,
        'inventory' : 20
      },

      {
        'id' : '2',
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
      id : data.id,
      name : data.name,
      price : Number(data.price),
      inventory : Number(data.inventory)
    };

    this._productList.push(productInfo);
    console.log('productList', this._productList);
    return true;
  }

  // will return reference to location of id through coersion
  verify(id) {
    return this._productList.some(element => {
      return element.id === id;
    })

    return false;
  }

  locate(id) {
    return this._productList.findIndex((element, index) => {
      return element.id === id;
    })
  }

  retrieve(id) {
    return this._productList.find(element => {
      return element.id === id;
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
    console.log(id);
    if (this.verify(id)) {
      return this._productList.filter((element) => {
        console.log('here', element);
        return element.id !== id;
      })
    }

    return false;
  }
} 

module.exports = Products;

  // will verify that the req name is a valid format
  // verify(data) {
  //   try {
  //     return this.create(data);
    
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }