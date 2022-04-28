/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />


let rez = 10;
let cols, rows;
let opensimplex;
let OS_SCALE = 0.2;
let border_cutoff = 0.2;
let xoff, yoff;

function setup() {
  createCanvas(600,600);
  cols = width / rez;
  rows = height / rez;
  
  // Set up noise generator
  opensimplex = new openSimplexNoise(random(255));
  xoff = 0;
  yoff = 0;
  
  // Construct the world
  field = []
  for(let row = 0; row < rows; row++) {
    let arr = []
    for(let col = 0; col < cols; col++) {
      arr.push(opensimplex.noise2D((col + xoff) * OS_SCALE, (row + yoff) * OS_SCALE))
    }
    field.push(arr)
  }

  // colorMode(HSL);
  rectMode(CORNERS);
}

function keyPressed() {
    
  
}

function draw() {
  background(20, 160, 20);

  if(keyIsPressed) {
    console.log(keyCode);
    if(keyCode == 173) {
      // zoom in
      OS_SCALE -= 0.001;
    }
    if(keyCode == 61) {
      // zoom out
      OS_SCALE += 0.001;
    }
    if(keyCode == LEFT_ARROW) {
      yoff -= 1;
    }
    if(keyCode == RIGHT_ARROW) {
      yoff += 1;
    }
    if(keyCode == DOWN_ARROW) {
      xoff += 1;
    }
    if(keyCode == UP_ARROW) {
      xoff -= 1;
    }

    if(keyCode == 188) {
      border_cutoff += 0.01;
      if(border_cutoff > 1) border_cutoff = 1;
    }
    if(keyCode == 190) {
      border_cutoff -= 0.01;
      if(border_cutoff < -1) border_cutoff = -1;
    }
  }


  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      field[i][j] = opensimplex.noise2D((i + xoff) * OS_SCALE, (j + yoff) * OS_SCALE);
      stroke(field[i][j] * 360, 70, 50);
      // fill(field[i][j]*360, 100, 50);
      // strokeWeight(rez * 0.6);
      // if(field[i][j] >= 0.5) {
      //   point(j*rez, i*rez);

      // }
      // rect(j*rez, i*rez, (j+1)*rez, (i+1)*rez);
    }
  }
  
  for(let i = 0; i < rows - 1; i++) {
    for(let j = 0; j < cols - 1; j++) {
      let x = j * rez;
      let y = i * rez;
      let a = createVector(x + rez*0.5, y); 
      let ab = createVector(x+rez, y);
      let b = createVector(x + rez, y + rez*0.5);
      let bc = createVector(x + rez, y + rez);
      let c = createVector(x + rez*0.5, y + rez);
      let cd = createVector(x, y + rez);
      let d = createVector(x, y + rez*0.5);
      let da = createVector(x, y);
      let state = getState(
        field[i][j],
        field[i][j+1],
        field[i+1][j+1],
        field[i+1][j]);

      stroke(0, 0, 255);
      fill(0, 0, 255)
      noStroke()
      switch(state) {
        case 1:
          vLine(c,d);
          vTri(c, d, cd);
          break;
        case 2:
          vLine(b,c);
          vTri(b, c, bc);
          break;
        case 3:
          vLine(b,d);
          vTri(b, bc, cd);
          vTri(b, cd, d);
          break;
        case 4:
          vLine(a,b);
          vTri(a, ab, b);
          break;
        case 5:
          vLine(a,d);
          vLine(c,b);
          vTri(a, b, ab);
          vTri(c, d, cd);
          vTri(c, b, a);
          vTri(a, c, d);
          break;
        case 6:
          vLine(a,c);
          vTri(a, c, ab);
          vTri(ab, c, bc);
          break;
        case 7:
          vLine(a,d);
          vTri(a, bc, ab);
          vTri(d, cd, bc);
          vTri(a, d, bc);
          break;
        case 8:
          vLine(a,d);
          vTri(a, d, da);
          break;
        case 9:
          vLine(a,c);
          vTri(a, c, da);
          vTri(da, c, cd);
          break;
        case 10:
          vLine(a,b);
          vLine(c,d);
          vTri(da, a, d)
          vTri(bc, b, c);
          vTri(a, b, c)
          vTri(a, c, d)
          break;
        case 11:
          vLine(a,b);
          vTri(a, da, cd)
          vTri(b, bc, cd)
          vTri(cd,a,b)
          break;
        case 12:
          vLine(b,d);
          vTri(b, ab, da);
          vTri(da, b, d);
          break;
        case 13:
          vLine(b,c);
          vTri(da, b, ab);
          vTri(da, c, cd)
          vTri(da, b, c)
          break;
        case 14:
          vLine(c,d);
          vTri(ab, d, da);
          vTri(ab, c, bc)
          vTri(ab, c, d)
          break;
        case 15:
          vTri(ab, bc, cd)
          vTri(ab, cd, da)
          break;
      }
    }
  }
}

function vLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function vTri(v1, v2, v3) {
  triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y)
}

function getState(a, b, c, d) {
  a = (a >= border_cutoff) ? 1 : 0
  b = (b >= border_cutoff) ? 1 : 0
  c = (c >= border_cutoff) ? 1 : 0
  d = (d >= border_cutoff) ? 1 : 0
  return (a * 8 + b * 4 + c * 2 + d * 1);
}