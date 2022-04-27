/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let cubes;

let view_pitch;
let w;
let angle;

const COUNT = 16;


function setup() {
  createCanvas(400, 400, WEBGL);

  w = width / COUNT;
  cubes = [];

  view_pitch = atan(1/sqrt(2));

  // cubes.push(new Cube(0, 0));
  // cubes.push(new Cube(w, w));
  for(let x = -width/2; x <= width/2; x += w) {
    for(let z = -width/2; z <= width/2; z += w) {
      cubes.push(new Cube(x, z));
      console.log("New cube!");
    }
  }
  angle = 0;
}

function draw() {
  colorMode(HSB);
  background(300, 20, 80);
  
  ortho(-width, width, height, -height, 0, 1000);
  ambientMaterial(0, 0, 100);
  rotateX(view_pitch);
  rotateY(QUARTER_PI);

  directionalLight(330, 80, 100, 0, -1, 0);
  directionalLight(0, 60, 100, 1, 1, 0);
  directionalLight(260, 60, 100, -2, 1, -1);

  for(let cube of cubes){
    push();
    translate(cube.x, 0, cube.z);
    cube.render();
    pop();
  }
  
  angle -= 0.05;
}

class Cube {
  constructor(x, z) {
    this.x = x;
    this.z = z;
    this.d = map(dist(x, z, 0, 0), 0, 100, 0, 2);
  }

  render() {
    box(w-2, (sin(angle + this.d) * 100) + 100 + w, w-2);
    
  }
}