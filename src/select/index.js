import R from "ramda";
import { from, where, and, or, done } from "../common";

let curry = null;
let all = null;
let filtered = null;

const isString = R.is(String);
const isArray = (type)=> R.type(type) === "Array";
const filterFuncs = {
	eq: R.whereEq,
	gt: (keyValue) => {
		const key = R.head(Object.keys(keyValue));
		const value = keyValue[key];
		R.gt(R.prop(key),value)
	},
}
function getByComparator(comparator) {
	return filterFuncs[comparator];
}

const wrapper  = {
	select: function(cols) {
		const _type = R.type(cols)
		if (!cols || isArray(_type)) {
			console.error("cols must be Array, but got " + _type);
			return -1;
		}
		curry = R.project(cols);
		return wrapper;
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
		return wrapper;
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
		return wrapper;
	},
	where: function(conditions) {
		const comparator = R.head(Object.keys(conditions));
		const keyValue = R.head(Object.keys(conditions).map(comparator => conditions[comparator]));
		filtered = R.filter(getByComparator(comparator)(keyValue), all);
		return wrapper;
	},
	done: function() {
		return R.type(filtered) === 'Null' ? all : filtered;
	}
}
module.exports = wrapper.select;
exports.default = wrapper.select;