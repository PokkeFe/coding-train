let a = 0;
let b;
let sponge = [];

function setup() {
    createCanvas(400, 400, WEBGL);
    b = new Box(0, 0, 0, 200);
    sponge.push(b);
}

function mousePressed() {
    let next = [];
    for (let box of sponge) {
        let newBoxes = box.generate();
        next.push(...newBoxes);
    }
    sponge = next;
}

function draw() {
    background(51);
    stroke(255);
    noStroke();
    lights();
    translate(0, 0, 0);

    //translate(width / 2, height / 2);
    let ax = map(mouseX, 0, width, -2, 2);
    let ay = map(mouseY, 0, height, -2, 2);
    rotateX(-ay);
    rotateY(ax);
    for (let box of sponge) {
        box.show();
    }
}