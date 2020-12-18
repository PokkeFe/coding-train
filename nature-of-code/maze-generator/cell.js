class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sides = {
      top: true,
      right: true,
      bottom: true,
      left: true
	};
	this.visited = false;
  }

  show() {
    let px = this.x * this.size;
    let py = this.y * this.size;
    let size = this.size;

	fill(125, 100, 172);

	if(this.visited) {
		noStroke();
		rect(px, py, size, size);
	}
    stroke(255);

    if (this.sides.top) line(px, py, px + size, py);

    if (this.sides.right) line(px + size, py, px + size, py + size);

    if (this.sides.bottom) line(px, py + size, px + size, py + size);

	if (this.sides.left) line(px, py, px, py + size);
	
  }
}
