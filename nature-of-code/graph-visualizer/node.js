class Node {
  constructor() {
    this.col = color(random(255), random(255), random(255));
    let tx = random(width);
    let ty = random(height);
    this.pos = createVector(tx, ty);
    this.isStatic = false;
    this.connected = [];
    this.edgeLen = 10000;
  }

  setStatic(isStatic) {
    this.isStatic = isStatic;
  }

  setPos(x, y) {
    this.pos.set(x, y);
  }

  addEdge(otherNode) {
    if(this.connected.indexOf(otherNode) == -1) {
      this.connected.push(otherNode);
      otherNode.addEdge(this);
    } else {
      console.error("Edge already exists.");
    }
  }

  removeEdge(otherNode) {
    let index = this.connected.indexOf(otherNode)
      if(index != -1) {
        this.connected.splice(index, 1);
        otherNode.removeEdge(this);
      } else {
        console.error("Edge not present");
      }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    noStroke();
    fill(this.col);
    ellipse(0, 0, 10, 10);
    pop();

  }

  showEdges() {
    push();
    stroke(255);
    strokeWeight(2);
    for(let other of this.connected) {
      line(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    }
    pop();
  }

  update(nodeList) {
    if(!this.isStatic) {
      for(let other of nodeList) {
        let x = other.pos.x - this.pos.x;
        let y = other.pos.y - this.pos.y;
        let d = x*x + y*y;


        let strength = this.edgeLen - d;

        let dir = createVector(x, y);
        dir.setMag(-strength / 10000.0);

        this.pos.add(dir);
      }
    }
  }
}
