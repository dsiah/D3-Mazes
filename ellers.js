function chance() {
	return (Math.random() >= 0.5);
}

function adjPave(row_sets, row_num, maze) {
	if (row_sets.length <= 1) 
		return row_sets;

	var cells = maze.cells, prev, curr;

	for (var ind = 1; ind < row_sets.length; ind++) {
		prev = row_sets[ind - 1];
		curr = row_sets[ind];
		if (curr != prev && chance()) {
			row_sets[ind] = prev;
			maze.removeWall(ind, row_num, 'W')
			maze.removeWall(ind - 1, row_num, 'E');
		}
	} 
}

function downPave(row_sets, row_num, maze) {
	// Pave down for all sets with one member
	// Otherwise randomly select member(s) of the set to pave down --> see groupPaveDown
	var i = 0;
	for (var j = 0; j < row_sets.length; j++) {
		if (row_sets[i] !== row_sets[j]) {
			if (j - i === 1) {
				// Case: set with one member -> Pave Down
				maze.removeWall(i, row_num, 'S');
				maze.removeWall(i, row_num + 1, 'N');
			} else {
				// Case 2: case with multiple members -> groupPaveDown
				groupPaveDown(i, j, row_num, maze);
			}
			i = j;
		}
		
	}

	// Finally check for last wall -- (TODO clean this up)
	if (i + 1 === j)  {
		maze.removeWall(i, row_num, 'S')
		maze.removeWall(i, row_num + 1, 'N')
	} else {
		groupPaveDown(i + 1, j, row_num, maze);	
	}
}

function groupPaveDown(start, end, row_num, maze) {
	// Make one or more paves down (and up from next row)
	var not_paved = true;
	while (not_paved) {
		// Keep trying until one or more cells pave down
		for (var i = start; i < end; i++) {
			if (chance()) {
				maze.removeWall(i, row_num, 'S');
				maze.removeWall(i, row_num + 1, 'N');
				not_paved = false;
			}
		}
	}
}

function implyNewSet(old_set, row_num, maze) {
	var row = maze.getRow(row_num),
			set = new Array(old_set.length),
			max = Math.max.apply(null, old_set);

	for (var i = 0; i < old_set.length; i++) {
		if (row[i] === 1) {
			set[i] = old_set[i];
		} else {
			max += 1;
			set[i] = max;
		}
	}

	return set;
}

function connect_final_row(set, maze) {
	var row_num = maze.y_dim - 1
	var row     = maze.getRow(row_num);

	for (var i = 1; i < set.length; i++) {
		if (set[i] !== set[i - 1]) {
			maze.removeWall(i,     row_num, 'W');
			maze.removeWall(i - 1, row_num, 'E');
		}
	}
}

function eller(maze) {
	var cells  = maze.cells,     // Cells of Maze
			r_sets = maze.row_sets,  // Temporary Cell-Set Mapping for row
			c_set  = 1,							 // Current Set 
			c_row  = 0,              // Current Row Number
			nrows   = maze.y_dim;    // Number of rows in Maze

	// (Step 1) Initialize First Row
	for (var m = 0; m < nrows; m++) {
		r_sets[m] = c_set;
		c_set++;
	}

	// (Step 2) Connect adjacent and disjoint cells at random
	adjPave(r_sets, c_row, maze);
	// (Step 3) Remove bottom walls randomly, each set must have at least one bottom wall removed
	downPave(r_sets, c_row, maze);

	// (Step 5) Repeat Step 2 - 4 until final row
	for (var row = 1; row < nrows - 1; row++) {
		// (Step 4) Fill in new row's blank set cells with new unique set numbers
		r_sets = implyNewSet(r_sets, row, maze);
		// (Step 2) Connect adjacent and disjoint cells at random
		adjPave(r_sets,  row, maze);
		// (Step 3) Remove bottom walls randomly, each set must have at least one bottom wall removed		
		downPave(r_sets, row, maze);
	}

	// (Step 6) Final Row: connect ALL adjacent and disjoint cells
	r_sets = implyNewSet(r_sets, nrows - 1, maze);
	connect_final_row(r_sets, maze);
	
	return maze;
}

var maze = eller(new Maze(3, 3));