var select = require('../../src/select');
var data = require('../mock');
var _ = require('ramda');
var assert = require("chai").assert

var it1Data = [{
  name: 'Aby',
},{
  name: 'caven',
},{
  name: 'carra',
},{
  name: 'karl',
},{
  name: 'karl',
}]
var it2Data = [{
  name: 'karl',
},{
  name: 'karl',
}] 
var it3Data = [{
  name: 'caven',
},{
  name: 'carra',
}, {
  name: 'karl'
}, {
  name: 'karl'
}] 
describe("select test suite", function(){
  // basic usage
  it('select(...)from(...)', function(){
    assert.deepEqual(select(['name']).from(data).done(), it1Data);
  });

  // filter result by the where clause
  it('select(...)from(...)where(...)', function(){
    assert.deepEqual(select(['name']).from(data).where({eq: {
      name: 'karl'
    }}).done(), it2Data);
    assert.deepEqual(select(['name']).from(data).where({gt: {
      age: 12
    }}).done(), it3Data);
  });   

  // further reduce according to mutiple conditions by adding 'and' and 'or' function 
  it('select(...)from(...)where(...)and(...)or(...)', function(){
    assert.deepEqual(select(['name']).from(data).where({eq: {
      name: 'karl'
    }}).done(), it3Data);
  });

  // sortBy sortByDesc
  it('select(...)from(...)where(...)sortBy()', function(){
    assert.deepEqual(select(['name']).from(data).where({eq: {
      name: 'karl'
    }}).done(), it3Data);
  });
  
  // take({pageNum:1, pageSize:2})
  it('select(...)from(...)where(...)take({pageSize: 10, pageNum: 2})', function(){
    assert.deepEqual(select(['name']).from(data).where({eq: {
      name: 'karl'
    }}).done(), it3Data);
  });
  

});
