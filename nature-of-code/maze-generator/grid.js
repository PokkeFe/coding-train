class Grid {
	constructor(cellSize, w, h) {
		this.cellSize = cellSize;
		this.width = w;
		this.height = h;
		this.grid = [];
	}

	getHeightPx() {
		return this.cellSize * this.height;
	}

	getWidthPx() {
		return this.cellSize * this.width;
	}

	index(x, y) {
		if(x < 0 || y < 0 || x > this.width-1 || y > this.height - 1) {
			return -1;
		}
		return x + y * this.width;
	}

	checkNeighbors(cell) {
		let neighbors = [];
		let grid = this.grid;

		let top = grid[this.index(cell.x, cell.y - 1)];
		let right = grid[this.index(cell.x + 1, cell.y)];
		let bottom = grid[this.index(cell.x, cell.y + 1)];
		let left = grid[this.index(cell.x - 1,cell.y)];

		if(top && !top.visited) {
			neighbors.push(top);
		}
		if(right && !right.visited) {
			neighbors.push(right);
		}
		if(bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if(left && !left.visited) {
			neighbors.push(left);
		}

		if(neighbors.length > 0) {
			let r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}
}