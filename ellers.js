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

Maze.prototype.removeWall = function(x, y, direction) {
	// (x,y) coordinates of cell to mutate
	// (direction) 1, 2, 4, 8 corresponds to N, S, W, E
	// (TODO) Implement Boundary check & implement other wall-removals
	var cells = this.cells;

	switch(direction) {
		case 'N':
			console.log('Changing the North wall');
			return;
		
		case 'S':
			console.log('Changing the South wall');
			return;

		case 'W':
			console.log('Changing the West wall');
			this.set(x, y, 4);
			this.set(x - 1, y, 8);
			return;

		case 'E':
			console.log('Changing the East wall');
			return;
	}

}

Maze.prototype.getRow = function (y) {
	return this.cells.slice(Math.floor(y / this.y_dim), this.x_dim);
}

function chance() {
	return (Math.random() >= 0.5);
}

function adjPave(row_sets, row_num, maze) {
	if (row_sets.length <= 1) 
		return row_sets;

	var cells = maze.cells,
			prev,
			curr;

	for (var ind = 1; ind < row_sets.length; ind++) {
		prev = row_sets[ind - 1];
		curr = row_sets[ind];
		if (curr != prev && chance()) {
			row_sets[ind] = prev;
			maze.removeWall(ind, row_num, 'W')
		}
	} 

	console.log(row_sets);
}

function eller(maze) {
	var cells  = maze.cells,    // Cells of Maze
			r_sets = maze.row_sets, // Temporary Cell-Set Mapping for row
			c_set  = 1,							// Current Set 
			c_row  = 0,             // Current Row Number
			nrows   = maze.y_dim;    // Number of rows in Maze

	// (Step 1) Initialize First Row
	for (var m = 0; m < nrows; m++) {
		r_sets[m] = c_set;
		c_set++;
	}

	// (Step 2) Connect adjacent and disjoint cells at random
	adjPave(r_sets, c_row, maze);
	console.log(cells);

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