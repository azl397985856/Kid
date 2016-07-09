## Introduction
A library which make it easier for you to manipulate array just like sql statement to table.


## Install

```bash
npm install crud
```

## Usage example
```js
var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
var kids = [abby, fred];
var cols = ['name', 'grade'];
var sortCol = 'name';
var pred = {name: {
	eq: Abby,
}}
select(cols).from(kids).sortBy(sortCol).where(pred); // [{name: 'Abby', age: 7}]
```
## API
- `.select(cols)`: 
Returns the chain, so you can call the from at once; e.g: select(...).from(...)

- `.update(table):
Returns the chain, so you can call the set at once; e.g: update(...).set(...)

- `.delete(table):
Returns the chain, so you can call the where at once; e.g: delete(...).where(...)

- `.insert(table):
Returns the chain, so you can call the values at once; e.g: insert(...).values(...)

- `.from(table):
Returns the result

- `.where(pred):
Returns the filterd result

- `.sortBy(cols):

- `.and(pred):

- `.or(pred):

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/CRUD/pulls) or as a [GitHub issue](https://github.com/azl397985856/CRUD/issues).
## Licence
MIT
