var Maze = function(x, y) {
	this.x_dim     = x;
	this.y_dim     = y;
	this.cells     = new Array(x * y).fill(0);
	this.row_sets  = new Array(x).fill(-1);
}

Maze.prototype.get = function(x, y) {
	var row   = this.y_dim * y;
	var index = row + x;
	return this.cells[index];
}

Maze.prototype.set = function(x, y, val) {
	var row   = this.y_dim * y;
	var index = row + x;
	this.cells[index] += val;
	return this.cells[index];
}

Maze.prototype.removeWall = function(x, y, direction) {
	// (x,y) coordinates of cell to mutate
	// (direction) 1, 2, 4, 8 corresponds to N, S, W, E
	// (TODO) Implement Boundary check & implement other wall-removals
	var cells = this.cells;

	switch(direction) {
		case 'N':
			this.set(x, y, 1);
			return;
		
		case 'S':
			this.set(x, y, 2);
			return;

		case 'W':
			this.set(x, y, 4);
			return;

		case 'E':
			this.set(x, y, 8);
			return;
	}
}

Maze.prototype.getRow = function (y) {
	var start = y * this.y_dim,
			end   = start + this.x_dim;
			
	return this.cells.slice(start, end);
}