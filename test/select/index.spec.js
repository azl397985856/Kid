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
    age: 18
  },{
    name: 'carra',
    age: 44
  }, {
    name: 'karl',
    age: 22
}];
var it4Data = [{
    name: 'karl',
    age: 22
  },{
    name: 'karl',
    age: 13
  },{
    name: 'carra',
    age: 44
}]
 
describe("select test suite", function(){
  // basic usage
  it('select(...)from(...)', function(){
    assert.deepEqual(select(['name']).from(data).done(), it1Data);
  });

  // filter result by the where clause
  // attention: if you use where to reduce, be sure the column exist in the select method. Just like sql statement if yu famliar with that
  it('select(...)from(...)where(...)', function(){
    assert.deepEqual(select(['name']).from(data).where({eq: {
      name: 'karl'
    }}).done(), it2Data);
    assert.deepEqual(select(['name', 'age']).from(data).where({gt: {
      age: 13
    }}).done(), it3Data);
  });   

  // further reduce according to mutiple conditions by adding 'and' and 'or' function 
  it('select(...)from(...)where(...)and(...)or(...)', function(){
    assert.deepEqual(select(['name', 'age']).from(data).where({eq: {
      name: 'karl'
    }}).and({gt: {
      age: 30
    }}).done(), []);

    assert.deepEqual(select(['name', 'age']).from(data).where({eq: {
      name: 'karl'
    }}).or({gt: {
      age: 30
    }}).done(), it4Data);
  });

  // // sortBy sortByDesc
  // it('select(...)from(...)where(...)sortBy()', function(){
  //   assert.deepEqual(select(['name']).from(data).where({eq: {
  //     name: 'karl'
  //   }}).done(), it3Data);
  // });

  // // take({pageNum:1, pageSize:2})
  // it('select(...)from(...)where(...)take({pageSize: 10, pageNum: 2})', function(){
  //   assert.deepEqual(select(['name']).from(data).where({eq: {
  //     name: 'karl'
  //   }}).done(), it3Data);
  // });
  

});
