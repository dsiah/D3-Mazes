var Fset = function(list) {
	this.values = {};
	// If values are supplied -> init Fset with them
	if (list) {
		for (var i = 0; i < list.length; i++) {
			this.values[list[i]] = true;
		}
	}
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
	var keys  = Object.keys(this);

	for (var key in this.values) {
		if (fset2.values[key])
			return false;
	}

	return true;
}

Fset.prototype.undirectedAdd = function(fset2) {
	for (var key in fset2.values) {
		this.values[key] = true;
	}

	for (var key in this.values) {
		fset2.values[key] = true;
	}
}

Fset.prototype.getMax  = function() {
	var top;
	
	for (var key in this.values) {
		if (key > top || !top) 
			top = key;
	}

	return Number(top);
}

Fset.prototype.copy = function(source) {
	for (var key in source.values) {
		this.values[key] = true;
	}
}
