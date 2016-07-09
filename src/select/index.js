import R from "ramda";
import { from, where, and, or } from "common";

let curry = null;
let all = null;
// var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
// var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
// var kids = [abby, fred];
// var cols = ['name', 'grade'];
// var sortCol = 'name';
// var pred = {name: {
//	eq: Abby,
//}}
// select(cols).from(kids).sortBy(sortCol).where().or().and().exe();
const isString = R.is(String);
const isArray = (type)=> R.type(type) === "Array"
const wrapper  = {
	select: function(cols) {
		const _type = R.type(cols)
		if (!cols || isArray(_type)) {
			console.error("cols must be Array, but got " + _type);
			return -1;
		}
		curry = R.project(cols);
		return this;
	},
	from: function(table) {
		const _type = R.type(table)
		if (!table || isArray(_type)) {
			console.error("cols must be Array, but got " + _type);
			return -1;
		}
		if (R.type(curry) === "Null") {
			console.error("you must select first, then call the from method!");
			return -1;
		}
		all = curry(table);
		return this;
	},
	// only support string now
	sortBy: function(sortCol) {
		const _type = R.type(sortCol)
		if (!sortCol || R.either(isArray(_type) || isString(_type))) {
			console.error("sortCol must be Array or String, but got " + _type);
			return -1;
		}
		if (all === "Null") {
			console.error("you must select(...)from(...) first, then call the sortBy method!");
			return -1;
		}
		R.sortBy(R.compose(R.prop(sortCol)))(all);
		return this;
	},
	where: function(conditions) {
		var pred = R.where({
			and: R.and,
			neq: R.complement(R.T()),
			gt: R.gt(_, 10),
			lt: R.lt(_, 20)
		});
	}
}
module.export = wrapper;
module.default = wrapper.select