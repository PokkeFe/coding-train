let numStars = 400;
let stars = [];
let speed = 10;

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < numStars; i++) {
        stars[i] = new Star();
    }

}

function draw() {
    background(51);
    translate(width / 2, height / 2);
    speed = map(mouseY, 0, width, 0, 50);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
    }
}