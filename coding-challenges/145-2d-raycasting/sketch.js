
let walls = [];
let particle;
function setup() {
    createCanvas(400, 400);
    for(let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls.push(new Boundary(x1, y1, x2, y2));
    }
    particle = new Particle();
}

function draw() {

    background(51);
    stroke(255);   
    strokeWeight(1);

    for(let wall of walls) {
        wall.show();
        particle.look(walls);
    }

    particle.setPos(mouseX, mouseY);
    particle.show();

    // if(pt) {
    //     fill(255);
    //     strokeWeight(5);
    //     point(pt.x, pt.y)
    // }

}