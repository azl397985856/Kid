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
select:

update:

delete:

insert:

from:

where:

sortBy:

and:

or:

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/CRUD/pulls) or as a [GitHub issue](https://github.com/azl397985856/CRUD/issues).
## Licence
MIT
