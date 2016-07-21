## Introduction
A library which make it easier for you to manipulate array just like sql statement to table.


## Install

```bash
npm install Kid
```
## Test

```bash
git clone https://github.com/azl397985856/Kid.git
cd Kid
npm i
npm run test
```
## Usage example

```js
var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
var kids = [abby, fred];
var cols = ['name', 'grade'];
var sortCol = 'name';
var pred = record => record.age < 10

select(cols).from(kids).sortBy(sortCol).where(pred); // [{name: 'Abby', age: 7}]
```
## API

- `.select(cols)`: 
Returns the chain, so you can call the from at once; e.g: select(...).from(...)

- `.update(table)`:
Returns the chain, so you can call the set at once; e.g: update(...).set(...)

- `.from(table)`:
Returns the result

- `.where(pred)`: take pred function in which returned boolean
Returns the filterd result

- `.sortBy(cols)`: take cols array in
Return filtered Result

- `.and(pred)`: take pred function in which returned boolean

- `.or(pred)`: take pred function in which returned boolean

- `.uniqAll(cols)`: uniqAll cols in the select statement

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/CRUD/pulls) or as a [GitHub issue](https://github.com/azl397985856/CRUD/issues).
## Licence

MIT
