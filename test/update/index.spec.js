var update = require('../../src/update');
var data = require('../mock');
var _ = require('ramda');
var assert = require("chai").assert

var it1Data = [{
  name: 'Aby',
  age: 12
},{
  name: 'Aby',
  age: 18
},{
  name: 'Aby',
  age: 44
},{
  name: 'Aby',
  age: 22
},{
  name: 'Aby',
  age: 13
}]
 
describe("update test suite", function(){
  // basic usage
  it('update(...)set(...)', function(){
    assert.deepEqual(update(data).set({
      name: 'Aby'
    }).done(), it1Data);
  });
});
