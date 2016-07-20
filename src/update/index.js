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
	update: function(table) {
		const _type = R.type(table)
		if (!table || isArray(_type)) {
			console.error("table must be Array, but got " + _type);
			return -1;
		}
		all = table;
		return wrapper;
	},
	set: function(condition) {
		all = all.map((row) => {
			var ret = Object.keys(condition).map((prop) => {
				const propsLens = R.lensProp(prop);
				return R.set(propsLens, condition[prop], row)
			})
			return R.head(ret);
		});
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
}
module.exports = wrapper.update;
exports.default = wrapper.update;