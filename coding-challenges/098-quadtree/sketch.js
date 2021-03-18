/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let qt, boundary;

let range;

function setup() {
  createCanvas(400, 400);
  frameRate(30);

  boundary = new Rectangle(200,200,200,200);
  qt = new QuadTree(boundary, 8);

  console.log(qt);
  for(let i = 0; i < 5000; i++) {
    let x = randomGaussian(width / 2, width / 8);
    let y = randomGaussian(height / 2, height / 8);
    let p = new Point(x,y);
    qt.insert(p);
  }

}

function draw() {

  
  range = new Rectangle(mouseX, mouseY, 50, 50);
  let points = qt.query(range);

  background(51);
  qt.draw();
  
  push();
  rectMode(RADIUS);
  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);
  rect(range.x, range.y, range.w, range.h);
  for(let p of points) {
    point(p.x, p.y);
  }
  //console.log(points.length);
  strokeWeight(1);
  text(points.length.toString(), 10, 10);
  pop();
}

function placePoint() {
  let m = new Point(mouseX, mouseY);
  qt.insert(m);
}

function mousePressed() {placePoint()}