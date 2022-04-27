/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let qt, boundary;

let allParticles;

let QT_ENABLED = true;

function setup() {
  createCanvas(400, 400);
  frameRate(60);

  boundary = new Rectangle(200,200,200,200);
  allParticles = [];

  for(let i = 0; i < 500; i++) {
    let x = randomGaussian(width / 2, width / 4);
    let y = randomGaussian(height / 2, height / 4);
    let p = new Particle(x,y);
    allParticles.push(p);
  }
}

function draw() {
  background(51);


  qt = new QuadTree(boundary, 3);

  for(let p of allParticles) {
    p.move();

    let qp = new Point(p.x, p.y, p);
    qt.insert(qp);

    p.draw();
    p.setHighlight(false);
  }
  if(QT_ENABLED){
    for(let p of allParticles) {
      let nearRange = new Rectangle(p.x, p.y, p.r*2, p.r*2);
      let nearPoints = qt.query(nearRange);
      for(let point of nearPoints) {
        let o = point.userData;
        if(p.intersects(o) && p != o) {
          p.setHighlight(true);
        }
      }
    }
  } else {
    for(let p of allParticles) {
      for(let o of allParticles) {
        if(p.intersects(o) && p!=o) {
          p.setHighlight(true);
        }
      }
    }
  }

  QT_ENABLED = true;
  if(mouseIsPressed) {
    QT_ENABLED = false;
  } else {
    qt.draw();
  }
  push();
  noStroke();
  fill(0, 255, 0);
  text(frameRate().toString().split(".")[0], 0, 10);
  pop();
}