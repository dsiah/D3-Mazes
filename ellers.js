var Maze = function(x, y) {
	this.x_dim     = x;
	this.y_dim     = y;
	this.cells     = new Array(x * y).fill(0);
	this.cell_sets = new Array(x * y).fill(0);
}

Maze.prototype.get = function(x, y) {
	var row   =  Math.floor(y / this.y_dim);
	var index = row + x;
	return this.cells[index];
}

Maze.prototype.set = function(x, y, val) {
	var row   = Math.floor(y / this.y_dim);
	var index = row + x;
	this.cells[index] = val;
	return this.cells[index];
}

Maze.prototype.getRow = function (y) {
	return this.cells.slice(Math.floor(y / this.y_dim), this.x_dim);
}

var m = new Maze(4, 4);

function firstRow(row) {
	row.forEach(function(value, index) {
		console.log(value, index);
	});
}

function eller(maze) {
	var hmap      = {},
			cells     = maze.cells;
			sindex    = 1, // Set index (next set_index to add)
	 		first_row = maze.getRow(0);
	
	firstRow(first_row);

	var psets = new Set([1]);

	// (1) Initialize first row to new sets
	for (var cell in first_row) {
		hmap[cell] = sindex;
		sindex++;
	}

	// (2) Add adjacent cells randomly
	for (var cell = 0; cell < first_row.length - 1; cell++) {
		var c_set = hmap[cell],
				n_set = hmap[cell + 1],
				toss  = (Math.random() >= 0.5);

		if (toss) {
			hmap[cell + 1]   = c_set;  // assign cell to 
			cells[cell] += 1 << 3;     // Add east edge to cells
		} else {
			psets.add(n_set);
		}
	}

	// (3) Tunnel down at least once for each unique (pset member) set 
	// represented in the row.
	psets.forEach(function(set_num) {
		var flag = false;
		
		while (!flag) {
			for (var cell in first_row) {
				var toss  = (Math.random() >= 0.5);
				if (hmap[cell] === set_num && toss) {
					// Tunnel down
					cells[+cell] += (1 << 1);
					cells[+cell  + m.y_dim] += (1 << 0);
					hmap[ +cell  + m.y_dim]  = set_num;
					flag = true;
				}
			}
		}
	});

	debugger;
}



eller(m);