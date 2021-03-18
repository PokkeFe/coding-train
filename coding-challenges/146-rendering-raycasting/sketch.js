// Raycast Rendering Engine

/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let walls = [];
let particle;

const sceneW = 400;
const sceneH = 400;
let maxDist;

function setup() {
    
    maxDist = sceneW;
    createCanvas(800, 400);
    // Create Border Walls
    walls.push(new Boundary(0, 0, sceneW, 0)); // TOP
    walls.push(new Boundary(0, sceneH, sceneW, sceneH)); // BOTTOM
    walls.push(new Boundary(0, 0, 0, sceneH)); // LEFT
    walls.push(new Boundary(sceneW, 0, sceneW, sceneH)); // RIGHT

    // Create Random Walls
    for(let i = 0; i < 5; i++) {
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        walls.push(new Boundary(x1, y1, x2, y2));
    }

    // Create Player
    particle = new Particle();
}

function draw() {

    // Draw Background
    background(51);

    // Set default draw rules
    stroke(255);   
    strokeWeight(1);

    // Show 2d Walls
    for(let wall of walls) {
        wall.show();
    }

    // Player Logic
    particle.update();
    let scene = particle.look(walls);
    let w = sceneW / scene.length;
    particle.show();

    // Draw Scene
    push();
    noStroke();
    translate(sceneW, 0);
    // Draw Sky
    fill(135, 206, 235);
    rect(0, 0, sceneW, sceneH/2);
    // Draw Ground
    fill(206,235,135);
    rect(0, sceneH/2, sceneW, sceneH);

    // Draw Walls
    for(let i = 0; i < scene.length; i++) {
        

        let h = map(scene[i], 0, maxDist, height, 0);
        //h = scene[i];
        let v = map(scene[i], 0, maxDist, 0.0, 1.0);
        if(scene[i] > maxDist) {
            h = 0;
            v = 1;
        }
        let wallColor = color(235,135,206);
        let fadeColor = color(0, 0, 0);
        let finalColor = lerpColor(wallColor, fadeColor, v);
        fill(finalColor);
        rect(i*w, (height-h)/2, w+1, h);
    }
    pop();

    // if(pt) {
    //     fill(255);
    //     strokeWeight(5);
    //     point(pt.x, pt.y)
    // }

}