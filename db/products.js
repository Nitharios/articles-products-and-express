/* jshint esversion:6 */
const validReq = { "success" : true };
const invalidReq = { "success" : false };

let productId = {};
let productNumber = 0;

class Products {
  constructor() {
  }
  // will verify that the req body is a valid format
  verify(req) {

  }
  // will save data from req body
  create(req) {

    let productInfo = {
      name : req.body.name,
      price : Number(req.body.price),
      inventory : Number(req.body.inventory)
    };

    productNumber++;
    productId[productNumber] = productInfo;
  }

  // will edit a product based on id
  edit(req) {


  }
} 

module.exports = Products;