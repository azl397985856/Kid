import R from "ramda";
import { from, where, and, or, done } from "../common";

let curry = null;
let all = null;
let filtered = null;

// a -> Boolean
const isString = R.is(String);
// a -> Boolean
const isArray = (type)=> R.type(type) === "Array";

const filterFuncs = {
	eq: R.whereEq,
	gt: (keyValue) => {
		const key = R.head(Object.keys(keyValue));
		const value = keyValue[key];
		return (payload) => R.gt(R.prop(key, payload),value)
	},
}
function getFilteredResultByConditions(conditions, source) {
	const comparator = R.head(Object.keys(conditions));
	const keyValue = R.head(Object.keys(conditions).map(comparator => conditions[comparator]));
	return R.filter(getByComparator(comparator)(keyValue), source);
}
// String -> Function | Undefined
function getByComparator(comparator) {
	const ret = filterFuncs[comparator];
	if (R.isNil(ret)) {
		console.error('sorry, the comparator' + comparator + ' is not the standard api we supplied');
		return;
	}
	return ret;
}

// there is one thing left:
// inside the where method. I changed the global variable filtered making the function not pure.
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
		filtered = getFilteredResultByConditions(conditions, all);
		return wrapper;
	},
	done: function() {
		return R.type(filtered) === 'Null' ? all : filtered;
	},
	and: function(conditions) {
		if (R.type(filtered) === 'Null') {
			console.error('please invoke the where method before doing that');
			return;
		}
		filtered = getFilteredResultByConditions(conditions, filtered);
		return wrapper;
	},
	or: function(conditions) {
		if (R.type(filtered) === 'Null') {
			console.error('please invoke the where method before doing that');
			return;
		}
		const or = getFilteredResultByConditions(conditions, all);
		filtered = R.union(filtered, or);
		return wrapper;
	}
}
module.exports = wrapper.select;
exports.default = wrapper.select;