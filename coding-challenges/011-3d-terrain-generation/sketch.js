/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let cols, rows;
const scl = 20;
let w = 1000;
let h = 800;
let flying = 0;
const flyingSpeed = 0.1
let yoff, xoff;

let terrain = [];


function setup() {
  createCanvas(600, 600, WEBGL);
  camera(0, 400, 100, 0, 100, 0, 0, 1, 0)
  cols = w / scl;
  rows = h / scl;
  frameRate(60)
  
  terrain = []
  for(let col = 0; col < cols; col++) {
    let arr = [];
    for(let row = 0 ; row < rows; row++) {
      arr.push(map(noise(xoff, yoff), 0, 1, -100, 100));
    }
    terrain.push(arr);
  }
  stroke(200);
  noFill();
}

function draw() {
  background(0)
  flying -= flyingSpeed

  yoff = 0;
  for(let col = 0; col < cols; col++) {
    xoff = flying;
    for(let row = 0 ; row < rows; row++) {
      terrain[col][row] = (map(noise(xoff, yoff), 0, 1, -100, 100));
      xoff += flyingSpeed
    }
    yoff += flyingSpeed
  }

  translate(-w/2, -h/2)

  for(let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for(let x = 0; x < cols; x++) {
      // rect((x * scl) - (width / 2), (y * scl) - (height / 2), scl , scl)
      vertex((x * scl), (y * scl), terrain[x][y])
      vertex((x * scl), ((y + 1) * scl), terrain[x][y + 1])
    }
    endShape();
  }
}