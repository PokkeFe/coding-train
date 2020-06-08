function setup() {
    createCanvas(400, 400);
    background(51);
}

function draw() {
    let pos = createVector(200, 200);
    let mouse = createVector(mouseX, mouseY);
    background(51, 50);

    let v = p5.Vector.sub(mouse, pos);
    v.setMag(100);

    translate(width / 2, height / 2);
    strokeWeight(4);
    stroke(255, 50);
    line(0, 0, v.x, v.y);
}