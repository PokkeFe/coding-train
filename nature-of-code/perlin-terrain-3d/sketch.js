let cols, rows;
let scl = 20;

function setup() {
  createCanvas(600, 600, WEBGL);
  let w = 600;
  let h = 600;
  cols = w / scl;
  rows = h / scl;
}

function draw() {
  background(51);
  stroke(0);
  //fill(255);
  noFill();
  for (let y = 0; y > -10; y--) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 3; x > -10; x--) {
      vertex(x*scl, y*scl);
      vertex(x*scl, (y+1)*scl);
    }
    endShape();
  }
}