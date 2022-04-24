/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let GRID_SIZE = 4;
const DEBUG = false;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

let UP_VECTOR;
let RIGHT_VECTOR;
let DOWN_VECTOR;
let LEFT_VECTOR;

let game_grid;
let touchBegin, touchCurrent, movedFlag;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  // Get grid size from URL parameters
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let size = urlParams.get('size');

  if(size) {
    GRID_SIZE = parseInt(size);
  }

  UP_VECTOR = createVector(0, -1);
  RIGHT_VECTOR = createVector(1, 0);
  DOWN_VECTOR = createVector(0, 1);
  LEFT_VECTOR = createVector(-1, 0);

  game_grid = new Grid(GRID_SIZE);
  game_grid.addNumber();
  game_grid.addNumber();
  game_grid.render();

}

function draw() {
  background(255);
  game_grid.render();

  if(DEBUG){
    if(touchBegin) {
      push();
      ellipse(touchBegin.x, touchBegin.y, 10, 10);

      if(touchCurrent) {
        line(touchBegin.x, touchBegin.y, touchCurrent.x, touchCurrent.y);
      }

      pop();
    }
  }
}

function slide(row, dir) {
  let arr = row.filter(val => val);
  let missing = GRID_SIZE - arr.length;
  let zeros = Array(missing).fill(0);
  if (dir == 'up') {
    arr.push(...zeros);
  } else if (dir == 'down') {
    arr.unshift(...zeros);
  }
  return arr;
}

function keyPressed() {
  switch (key) {
    case 'ArrowUp':
      game_grid.slide(UP);
      break;
    case 'ArrowRight':
      game_grid.slide(RIGHT);
      break;
    case 'ArrowDown':
      game_grid.slide(DOWN);
      break;
    case 'ArrowLeft':
      game_grid.slide(LEFT);
      break;
  }
}

function touchMoved() {
  if(!movedFlag){
    if(touchBegin == undefined) {
      touchBegin = createVector(mouseX, mouseY);
    }
    touchCurrent = createVector(mouseX, mouseY);

    let d = p5.Vector.dist(touchBegin, touchCurrent);
    if(d > 30) {
      let dir = getDirection();
      game_grid.slide(dir);
    }
  }
  return false;
}

function touchEnded() {
  console.log("Touch ended");
  touchBegin = undefined;
  touchCurrent = undefined;
  movedFlag = false;
}

function getDirection() {
  movedFlag = true;
  let v = p5.Vector.sub(touchCurrent, touchBegin);
  let max = p5.Vector.dot(UP_VECTOR, v);
  let maxDir = UP;
  let thisDot;
  
  thisDot = p5.Vector.dot(RIGHT_VECTOR, v);
  if(thisDot > max) {
    max = thisDot;
    maxDir = RIGHT;
  }

  thisDot = p5.Vector.dot(DOWN_VECTOR, v);
  if(thisDot > max) {
    max = thisDot;
    maxDir = DOWN;
  }

  thisDot = p5.Vector.dot(LEFT_VECTOR, v);
  if(thisDot > max) {
    max = thisDot;
    maxDir = LEFT;
  }

  return maxDir;
}