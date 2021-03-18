let cellSize = 10;
let mapSize = 40;
let grid;
let current;
let next;
let stack = [];

function setup() {
  // put setup code here

  frameRate(165);

  grid = new Grid(cellSize, mapSize, mapSize);

  createCanvas(grid.getWidthPx(), grid.getHeightPx());

  for(let y = 0; y < grid.height; y++){
    for(let x = 0; x < grid.width; x++){
      let cell = new Cell(x, y, grid.cellSize);
      grid.grid.push(cell);
    }
  }

  current = grid.grid[0];
  current.visited = true;
  

}

function draw() {
  // put drawing code here
  background(51);
  for(let cell of grid.grid){
    cell.show();
  }

  
  // STEP 1
  let next = grid.checkNeighbors(current);
  if(next) {
    next.visited = true;

    stack.push(current);
    // STEP 3
    removeWalls(current, next);
    // STEP 4
    current = next;
  } else {
    if(stack.length != 0) {
      current = stack.pop()
    }
  }
  



}
/* Mouse Click 
function mouseClicked() {
  console.log("Clicked");
  let x = floor(mouseX / grid.cellSize);
  let y = floor(mouseY / grid.cellSize);
  console.log(x,y)
  next = grid.grid[grid.index(x, y)];
  next.visited = true;
  if(current) {
    removeWalls(current, next);
  }
  current = next;
}
*/













function removeWalls(a,b) {
  let x = b.x - a.x;
  let y = b.y - a.y;
  if(x == 1) {
    a.sides.right = false;
    b.sides.left = false;
  }
  if(x == -1) {
    a.sides.left = false;
    b.sides.right = false;
  }
  if(y == 1) {
    a.sides.bottom = false;
    b.sides.top = false;
  }
  if(y == -1) {
    a.sides.top = false;
    b.sides.bottom = false;
  }
}