var Maze = function(x, y) {
	this.x_dim     = x;
	this.y_dim     = y;
	this.cells     = new Array(x * y).fill(0);
	this.row_sets  = new Array(x).fill(-1);
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

Maze.prototype.removeWall(x, y, direction) {
	// (x,y) coordinates of cell to mutate
	// (direction) 
}

Maze.prototype.getRow = function (y) {
	return this.cells.slice(Math.floor(y / this.y_dim), this.x_dim);
}

function chance() {
	return (Math.random() >= 0.5);
}

function adjPave(row_sets, row_num, maze) {
	if (row_sets.length <= 1) 
		return row.sets;

	var cells = maze.cells,
			prev,
			curr;
			

	for (var ind = 1; ind < row.length; ind++) {
		prev = row_sets[ind - 1];
		curr = row_sets[ind];
	} 

}

function eller(maze) {
	var cells  = maze.cells,    // Cells of Maze
			r_sets = maze.row_sets, // Temporary Cell-Set Mapping for row
			c_set  = 0,							// Current Set 
			c_row  = 0,             // Current Row Number
			rows   = maze.y_dim;    // Number of rows in Maze

	// (Step 1) Initialize First Row
	for (var m = 0; m < nrows - 2; m++) {
		r_sets[m] = c_set;
		c_set++;
	}

	// (Step 2) Connect adjacent and disjoint cells at random

	// (Step 3) Remove bottom walls randomly, each set must have at least one bottom wall removed

	// (Step 4) Fill in new row's blank set cells with new unique set numbers

	// (Step 5) Repeat Step 2 - 4 until final row

	// (Step 6) Final Row: connect ALL adjacent and disjoint cells
	if (c_row === nrows - 1) {
		// Connect all adjacent and disjoint cells
	}


	return maze;
}

eller(new Maze(4, 4));