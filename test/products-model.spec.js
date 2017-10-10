/* jshint esversion:6 */
const chai = require('chai');
const expect = chai.expect;

const Products = require('../db/products');

describe('Product tests', function() {
  const products = new Products();

  it('should add a new product to the collection', function() {
    let result = products.create('');
    expect(result).to.have.property('id');
  });

  it('get product by id', function() {
    let foundProducts = products.find(3);
    expect(foundProducts.id).to.equal(3);
  });
});