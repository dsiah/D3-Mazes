var Maze = function(x, y) {
	this.x_dim     = x;
	this.y_dim     = y;
	this.cells     = new Array(x * y).fill(0);
	this.row_sets  = new Array(x).fill(-1);
}

Maze.prototype.get = function(x, y) {
	var row   = this.y_dim * y,
			index = row + x;

	return this.cells[index];
}

Maze.prototype.set = function(x, y, val) {
	var row   = this.y_dim * y,
			index = row + x;

	this.cells[index] += val;
	return this.cells[index];
}

Maze.prototype.removeWall = function(x, y, direction) {
	// (x,y) coordinates of cell to mutate
	// (direction) 1, 2, 4, 8 corresponds to N, S, W, E
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

Maze.prototype.getRow = function(y) {
	var start = y * this.y_dim,
			end   = start + this.x_dim;
			
	return this.cells.slice(start, end);
}

Maze.prototype.drawMaze = function(d3, id) {
	var canvas = d3.select('#' + id);
}

Maze.prototype.drawGraph = function(d3, id) {
	var canvas  = d3.select('#' + id),
	 		context = canvas.node().getContext("2d"),
	 		padding = 15,
			node_x  = 6,
			node_y  = 6;

	context.scale(2,2);

	for (var y = 0; y < maze.y_dim; y++) {
		for (var x = 0; x < maze.x_dim; x++) {
			var cell = this.get(x, y);

			context.fillStyle = "steelblue";
			context.fillRect(x * padding + 10, y * padding + 10, node_x, node_y);
			
			context.fillStyle = "orange";

			// Draw East
			if (cell & 8) {
				context.fillRect(node_x + (x * padding) + 10,  y * padding + 10 + node_y / 4, padding - node_x, node_y / 2);
			}

			// Draw South
			if (cell & 2) {
				context.fillRect((x * padding) + 10 + node_x/4, y * padding + 10 + node_y, node_x / 2, padding - node_y);
			}
		}
	}
}