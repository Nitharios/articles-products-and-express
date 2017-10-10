/* jshint esversion:6 */

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;
const request = require('supertest');

const app = require('../app');

describe('GET smoke test', function() {
  it('smoke test', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end(done);
  });

  it('get all products', function(done) {
    request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      // .expect(match what is returned)
      .end(done);
  });

  it('add new product', function(done) {
    request(app)
      .post('/products')
      .type('form')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(/* specific format */)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(function(res) {
          console.log('resBody', res.body);
        return (res.body.id && typeof res.body.id === 'number');
      })
      .end(done);
  });
});