let cells = [];

function setup() {
    createCanvas(400, 400);
    let cell = new Cell(random(0, width), random(0, height), 100, color(random(0, 100), 200, random(100, 255)));
    cells.push(cell);
}

function draw() {
    background(51);
    for (let cell of cells) {
        if (!keyIsPressed) {
            cell.move();
        }
        cell.show();
    }
}

function mousePressed() {
    console.log("Pressed");
    for (let cell of cells) {
        if (cell.clicked(mouseX, mouseY)) {
            console.log("Clicked!");
            let newCells = cell.split();
            cells.splice(cells.indexOf(cell), 1);
            cells = concat(cells, newCells);
        }
    }
}