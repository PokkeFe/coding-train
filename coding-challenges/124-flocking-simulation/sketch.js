/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let alignSlider, cohesionSlider, separationSlider;

const flock = [];

function setup() {
  createCanvas(800, 800);
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);
  for(let i = 0; i < 100; i++)
  {
    flock.push(new Boid(color(random(255), random(255), random(255))));
  }
}

function draw() {
  background(51);
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.show();
    boid.edges();
  }
}