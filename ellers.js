function eller(maze) {
	var c_set  = maze.x_dim,		// Current Set 
			cells  = maze.cells,    // Cells of Maze
			nrows  = maze.y_dim,    // Number of rows in Maze
			sets   = new Array(maze.x_dim).fill(null);	

	// (Step 1) Initialize First Row
	for (var i = 0; i < c_set; i++) {
		sets[i] = new Fset([i]);
	}
	debugger;
	// (Step 2) Repeat Step 2a-2c until for each row until the last row
	for (var row = 0; row < nrows - 1; row++) {
		console.log(sets);
		debugger;
		// (Step 2a) Connect adjacent and disjoint cells at random
		console.log(row, sets);
		adjPave(sets, row, maze);
		// (Step 2b) Remove bottom walls randomly, each set must have at least one bottom wall removed		
		console.log(row, sets, 'after');
		downPave(sets, row, maze);
		// (Step 2c) Fill in new row's blank set cells with new unique set numbers
		results = setRefresh(sets, row + 1, maze);
		sets    = results.set;
		c_set   = results.max;
	}
	// (Step 3) Final Row: connect ALL adjacent and disjoint cells
	console.log('final row', sets);
	finalRow(sets, maze);
	return maze;
}

function adjPave(sets, row, maze) {
	var	prev, curr, next;

	for (var i = 1; i < sets.length; i++) {
		prev = sets[i - 1];
		curr = sets[i];

		if (curr.intersectWith(prev) && chance()) {
			console.log('adding members of', curr, 'to', prev);
			
			curr.undirectedAdd(prev);
			maze.removeWall(i, row, 'W')
			maze.removeWall(i - 1, row, 'E');
		} 
	} 
}

function downPave(sets, row, maze) {
	// Pave down for all sets with one member
	// Otherwise randomly select member(s) of the set to pave down --> see groupPaveDown
	var i = 0;
	for (var j = 0; j < sets.length; j++) {
		var curr = sets[j], prev = sets[i];

		if (curr.intersectWith(prev)) {
			if (j - i === 1) {
				// Case: set with one member -> Pave Down
				maze.removeWall(i, row, 'S');
				maze.removeWall(i, row + 1, 'N');
			} else {
				// Case 2: case with multiple members -> groupPaveDown
				groupPaveDown(i, j, row, maze);
			}
			i = j;
		}	
	}
	// Finally check for last wall -- (TODO clean this up)
	if (i + 1 === j)  {
		maze.removeWall(i, row, 'S')
		maze.removeWall(i, row + 1, 'N')
	} else {
		groupPaveDown(i + 1, j, row, maze);	
	}
}

function groupPaveDown(start, end, row, maze) {
	// Make one or more paves down (and up from next row)
	var not_paved = true;
	while (not_paved) {
		// Keep trying until one or more cells pave down
		for (var i = start; i < end; i++) {
			if (chance()) {
				maze.removeWall(i, row, 'S');
				maze.removeWall(i, row + 1, 'N');
				not_paved = false;
			}
		}
	}
}

function setRefresh(old_set, row, maze) {
	var curr  = maze.getRow(row),
			set   = new Array(old_set.length),
			maxes = old_set.map(function(i) { return i.getMax() }),
			max   = Math.max.apply(null, maxes) + 1; 

	for (var i = 0; i < old_set.length; i++) {
		if (curr[i] === 1) {
			set[i] = old_set[i];
		} else {
			set[i] = new Fset([max]);
			max   += 1;
		}
	}
	return { set: set, max: max };
}

function finalRow(sets, maze) {
	var row_num = maze.y_dim - 1,
			row     = maze.getRow(row_num),
			curr, prev;

	for (var i = 1; i < sets.length; i++) {
		curr = sets[i];
		prev = sets[i - 1];

		if (curr.intersectWith(prev)) {
			curr.undirectedAdd(prev);
			maze.removeWall(i,     row_num, 'W');
			maze.removeWall(i - 1, row_num, 'E');
		}
	}
}

function chance() {
	return (Math.random() >= 0.5);
}

var maze = eller(new Maze(5, 5));

//maze.drawGraph(d3, 'eller-generation');
maze.animateGraph(d3, 'eller-generation');