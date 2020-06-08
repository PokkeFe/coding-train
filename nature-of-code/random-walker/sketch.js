function setup() {
    createCanvas(800, 800);
    walker = new Walker(200, 200);
}

function draw() {
    background(51);
    walker.update();
    walker.show();
    walker.showForce();
}