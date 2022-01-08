/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

const SIZE = 500
const SPACING = SIZE / 40

const ALL_OPTIONS = [{ dx: 1, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 1 }, { dx: 0, dy: -1 }];

let grid;
let x, y;

function make2DArray(rows, cols) {
  arr = new Array(rows)
  for(let i = 0; i < arr.length; i++)
  {
    arr[i] = new Array(cols)
  }
  return arr
}

function setup() {
  createCanvas(SIZE, SIZE)
  grid = make2DArray(floor(width / SPACING) + 1, floor(height / SPACING) + 1)
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      grid[i][j] = false
    }
  }
  console.table(grid)
  x = floor(grid.length / 2)
  y = floor(grid.length / 2)
  background(51)
}

function draw() {
  stroke(255)
  strokeWeight(SPACING / 2)
  point(x * SPACING, y * SPACING)

  let options = ALL_OPTIONS.filter(option => {
    let newX = x + option.dx
    let newY = y + option.dy
    // check oob
    if(newX >= grid[0].length) return false
    if(newX < 0) return false
    if(newY >= grid.length) return false
    if(newY < 0) return false
    // check not occupied
    if(!grid[newY][newX]) {
      return true
    }
    return false
  })

  const r = floor(random(options.length))
  if(r >= options.length) r = options.length - 1
  x += options[r].dx
  y += options[r].dy
  grid[y][x] = true;

  if (x >= grid.length) x = grid.length - 1
  if (y >= grid.length) y = grid.length - 1
  if (y < 0) y = 0
  if (x < 0) x = 0
}