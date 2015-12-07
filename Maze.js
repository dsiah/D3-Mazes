var Maze = function(x, y) {
	this.x_dim     = x;
	this.y_dim     = y;
	this.cells     = new Array(x * y).fill(0);
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

Maze.prototype.animateMaze = function(d3, id) {
	var gradient = d3.scale.linear()
									 .domain([0, maze.cells.length / 2 ,maze.cells.length])
									 .range(['steelblue', 'white', 'red']);

	var canvas  = d3.select('#' + id),
			ctx = canvas.node().getContext("2d"),
			padding = 10,
			node_x  = 9,
			offset  = 5,
			count   = 0,
			node_y  = 9;

	ctx.scale(2,2); // For Retina Screens

	var stopme = window.setInterval(function() { 
		var y = count;


		for (var x = 0; x < maze.x_dim; x++) {
			var cell      = maze.get(x, y),
					cell_val  = count * maze.y_dim + x,
					color     = gradient(cell_val);
			
			ctx.fillStyle = color;
			ctx.fillRect(x * padding + offset, y * padding + offset, node_x, node_y);
			ctx.fillStyle = color;
			// Draw East
			if (cell & 8) {
				ctx.fillRect(node_x + (x * padding) + offset,  y * padding + offset, padding - node_x, node_y);
			}
			// Draw South
			if (cell & 2) {
				ctx.fillRect((x * padding) + offset, y * padding + offset + node_y, node_x, padding - node_y);
			}
		}

		count++;

		if (count > maze.y_dim - 1) {
			window.clearInterval(stopme);
		}
	}, 30);
}

Maze.prototype.animateGraph = function(d3, id) {
	var canvas  = d3.select('#' + id),
			ctx = canvas.node().getContext("2d"),
			padding = 10,
			node_x  = 5,
			offset  = 5,
			count   = 0,
			node_y  = 5;

	ctx.scale(2,2);

	var stopme = window.setInterval(function() { 
		var y = count;

		for (var x = 0; x < maze.x_dim; x++) {
			var cell = maze.get(x, y);

			ctx.fillStyle = "steelblue";
			ctx.fillRect(x * padding + (3*offset/2), y * padding + (3*offset/2), node_x, node_y);
			ctx.fillStyle = "orange";
			
			// Draw East
			if (cell & 8) {
				ctx.fillRect(node_x + (x * padding) + (3*offset/2),  y * padding + (3*offset/2) + node_y / 4, padding - node_x, node_y / 2);
			}
			// Draw South
			if (cell & 2) {
				ctx.fillRect((x * padding) + (3*offset/2) + node_x/4, y * padding + (3*offset/2) + node_y, node_x / 2, padding);
			}
		}

		count++;

		if (count > maze.y_dim - 1) {
			window.clearInterval(stopme);
		}
	}, 12);
}