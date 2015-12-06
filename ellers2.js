function chance() {
	return (Math.random() >= 0.5);
}

function eller(maze) {
	var c_set  = maze.x_dim,		// Current Set 
			cells  = maze.cells,    // Cells of Maze
			nrows  = maze.y_dim,    // Number of rows in Maze
			sets   = new Array(maze.x_dim).fill(-1);
			

	// (Step 1) Initialize First Row
	for (var i = 0; i < c_set; i++) {
		var curr = new Fset();
		curr.add(i);
		sets[i] = curr;
	}
	
	console.log(sets);
	
	// (Step 2) Repeat Step 2a-2c until for each row until the last row
	 for (var row = 0; row < nrows - 1; row++) {
	// 	// (Step 2a) Connect adjacent and disjoint cells at random
	// 	adjPave(r_sets,  row, maze);
	// 	// (Step 2b) Remove bottom walls randomly, each set must have at least one bottom wall removed		
	// 	downPave(r_sets, row, maze);
	// 	console.log(r_sets, 'after down pave');
	// 	// (Step 2c) Fill in new row's blank set cells with new unique set numbers
	// 	r_sets = implyNewSet(r_sets, row + 1, maze);
	// 	console.log(r_sets, 'next set');	
	}
	// // (Step 3) Final Row: connect ALL adjacent and disjoint cells
	// finalRow(r_sets, maze);
	// return maze;
}

var maze = eller(new Maze(13, 13));
//maze.drawGraph(d3, 'eller-generation');