const wrapper  = {
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
	where: function(conditions) {
		var pred = R.where({
			and: R.and,
			neq: R.complement(R.T()),
			gt: R.gt(_, 10),
			lt: R.lt(_, 20)
		});
	},
	and: function() {

	},
	or: function() {

	}
}
module.export = wrapper;
module.default = wrapper.from