/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let grid, next;

const dA = 1.0;
const dB = 0.5;
const feed = 0.055;
const kill = 0.062;

function setup() {
  createCanvas(200, 200);
  grid = new Array(width);
  next = new Array(width);
  for(let i = 0; i < width; i++) {
    grid[i] = new Array(height);
    next[i] = new Array(height);
    for(let j = 0; j < height; j++) {
      grid[i][j] = {a: 1, b: 0};
      next[i][j] = {a: 1, b: 0};
    }
  }

  for(let i = 100; i < 110; i++) {
    for(let j = 100; j < 110; j++) {
      grid[i][j].b = 1
    }
  }
  pixelDensity(1);
  frameRate(60);

}

function draw() {
  background(51);

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let a = grid[x][y].a;
      let b = grid[x][y].b;
      next[x][y].a = a + 
        (dA * laplaceA(x, y)) - 
        (a * b * b) + 
        (feed * (1 - a));
      next[x][y].b = b + 
        (dB * laplaceB(x, y)) + 
        (a * b * b) - 
        ((kill + feed) * b);

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }
  
  
  loadPixels();
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let pix = (x + y * width) * 4;
      pixels[pix+0] = grid[x][y].a * 255;
      pixels[pix+1] = 0;
      pixels[pix+2] = grid[x][y].b * 255;
      pixels[pix+3] = 255;
    }
  }
  updatePixels(0, 0, width, height);
 
  swap();
  
}

function swap() {
  let temp = grid;
  grid = next;
  next = grid;
}

function laplaceA(x, y) {
  let sum = 0;
  let doLeft = (x != 0);
  let doRight = (x != width-1);
  let doTop = (y != 0);
  let doBottom = (y != height-1);

  sum += grid[x][y].a * -1;

  if(doTop) sum += grid[x][y-1].a * 0.2;
  if(doRight) sum += grid[x+1][y].a * 0.2;
  if(doBottom) sum += grid[x][y+1].a * 0.2;
  if(doLeft) sum += grid[x-1][y].a * 0.2;
  
  if(doTop && doRight) sum += grid[x+1][y-1].a * 0.05;
  if(doBottom && doRight) sum += grid[x+1][y+1].a * 0.05;
  if(doTop && doLeft) sum += grid[x-1][y-1].a * 0.05;
  if(doBottom && doLeft) sum += grid[x-1][y+1].a * 0.05;
  
  return sum;
}

function laplaceB(x, y) {
  let sum = 0;
  let doLeft = (x != 0);
  let doRight = (x != width-1);
  let doTop = (y != 0);
  let doBottom = (y != height-1);

  sum += grid[x][y].b * -1;

  if(doTop) sum += grid[x][y-1].b * 0.2;
  if(doRight) sum += grid[x+1][y].b * 0.2;
  if(doBottom) sum += grid[x][y+1].b * 0.2;
  if(doLeft) sum += grid[x-1][y].b * 0.2;
  
  if(doTop && doRight) sum += grid[x+1][y-1].b * 0.05;
  if(doBottom && doRight) sum += grid[x+1][y+1].b * 0.05;
  if(doTop && doLeft) sum += grid[x-1][y-1].b * 0.05;
  if(doBottom && doLeft) sum += grid[x-1][y+1].b * 0.05;
  
  return sum;
}