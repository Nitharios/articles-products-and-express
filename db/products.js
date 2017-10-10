/* jshint esversion:6 */
const validReq = { "success" : true };
const invalidReq = { "success" : false };

let productsArr = [];

class Products {
  constructor() {
  }
  // will verify that the req body is a valid format
  verify(req) {

  }
  // will save data from req body
  create(req) {

    let tempProduct = {
      id : productsArr.length,
      name : req.body.name,
      price : Number(req.body.price),
      inventory : Number(req.body.inventory)
    };

    productsArr.push(tempProduct);
  }
} 

module.exports = Products;