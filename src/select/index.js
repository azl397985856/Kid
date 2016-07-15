import R from "ramda";
import { from, where, and, or, done } from "../common";

let curry = null;
let all = null;
let filtered = null;

// a -> Boolean
const isString = R.is(String);
// a -> Boolean
const isArray = (type)=> R.type(type) === "Array";

function getFilteredResult(pred, source) {
	return R.filter(pred, source);

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
			console.error("table must be Array, but got " + _type);
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
	where: function(pred) {
		filtered = getFilteredResult(pred, all);
		return wrapper;
	},
	done: function() {
		return R.type(filtered) === 'Null' ? all : filtered;
	},
	and: function(pred) {
		if (R.type(filtered) === 'Null') {
			console.error('please invoke the where method before doing that');
			return;
		}
		filtered = getFilteredResult(pred, filtered);
		return wrapper;
	},
	or: function(pred) {
		if (R.type(filtered) === 'Null') {
			console.error('please invoke the where method before doing that');
			return;
		}
		const or = getFilteredResult(pred, all);
		filtered = R.union(filtered, or);
		return wrapper;
	},
	uniqAll: function() {
		if (R.type(all) === 'Null') {
			console.error('please invoke the where method before doing that');
			return;
		}
		filtered = R.uniq(all);
		return wrapper;
	},
	uniqBy: function() {

	}
}
module.exports = wrapper.select;
exports.default = wrapper.select;