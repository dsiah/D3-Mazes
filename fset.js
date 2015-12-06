var Fset = function() {
	this.values = {};
}

Fset.prototype.add = function(i) {
	this.values[i] = true;
}

Fset.prototype.addAll = function(list) {
	for (var i = 0; i < list.length; i++) {
		this.values[list[i]] = true;
	}
}

Fset.prototype.clone = function(fset) {
	var new_fset = new Fset();
	
	for (var key in fset) {
		new_fset.add(key);
	}

	return new_fset;
}

Fset.prototype.intersectWith = function(fset2) {
	var keys  = Object.keys(this),
			inter = {};

	for (var key in this.values) {
		if (fset2.values[key])
			return false;
	}

	return true;
}

// Tests
// var f = new Fset();
// var g = new Fset();
// f.addAll([1,2,3]);
// g.addAll([2,3,4]);