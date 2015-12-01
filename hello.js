

Array.prototype.uniq = function() {
	var arr = [];
	var obj = {};
	for (var i = 0; i < this.length; i++) {
		if (!obj[this[i]]) {
			arr.push(this[i]);
			obj[this[i]] = 1;
		}
	}
	return arr;
}

console.log([false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN].uniq())