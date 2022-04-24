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
    this.color = 1;
  }

  show(active) {
    let px = this.x * this.size;
    let py = this.y * this.size;
    let size = this.size;

    fill(125, 100, 172);
    /*
    switch(this.color) {
      case 0:
        fill(125, 100, 172);
        break;
      case 1:
        fill(255, 100, 172);
        break;
      case 2:
        fill(125, 100, 255);
        break;
      case 3:
        fill(125, 255, 172);
        break;
      case 4:
        fill(255, 100, 255);
        break;
    }*/
    
    if(active == true) {
      fill(255, 255, 255);
    }

    if (this.visited) {
      noStroke();
      rect(px, py, size, size);
    }
    stroke(255);

    if (this.sides.top) line(px, py, px + size, py);

    if (this.sides.right) line(px + size, py, px + size, py + size);

    if (this.sides.bottom) line(px, py + size, px + size, py + size);

    if (this.sides.left) line(px, py, px, py + size);

  }

  nextColor() {
    this.color = (this.color + 1) % 5;
  }
}
