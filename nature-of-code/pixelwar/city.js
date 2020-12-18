class City {
  constructor(x,y, team, name) {
    this.pos = createVector(x, y);
    this.team = team;
    this.scale = 1;
    this.name = name;
    this.gameScale = 4;
    this.neighbors = [];
  }
  
  draw() {
    stroke(255);
    strokeWeight(2);
    let pos = this.pos;
    rect(pos.x - (this.scale*this.gameScale)/2, pos.y - (this.scale*this.gameScale)/2, this.scale*this.gameScale, this.scale*this.gameScale)
  }
  
  drawConnections() {
    stroke(26, 255, 26);
    strokeWeight(0.5);
    for(let neighbor of this.neighbors) {
      // console.log(neighbor);
      line(this.pos.x, this.pos.y, neighbor.pos.x, neighbor.pos.y);
    }
  }

  drawName() {
    textSize(8);
    text(this.name, this.pos.x , this.pos.y, this.pos.x + 132, this.pos.y + 132);
  }
}