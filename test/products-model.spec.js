/* jshint esversion:6 */
const chai = require('chai');
const expect = chai.expect;

const Products = require('../models/products');

describe('Product tests', function() {
  const products = new Products();

  it('should add a new product to the collection', function() {
    let result = products.create({
      name : 'burgers',
      price : 10,
      inventory : 10
    }).then((data) => {
      return data;
      console.log('result', result);
      expect(result).to.have.property('name');
    });
  });
});

