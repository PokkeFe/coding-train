/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

var angleSlider, falloffSlider;
var root;
var trees = [];

function setup() {
  createCanvas(400,400);
  // angleSlider = createSlider(0, PI, PI / 4, 0.01).addClass("angle-slider");
  // angleSlider.addClass("slider");
  // falloffSlider = createSlider(0.1, 0.9, 0.5, 0.01).addClass("falloff-slider");
  // falloffSlider.addClass("slider");
  
  let a = createVector(width/2, height);
  let b = createVector(width/2, height - 50);
  root = new Branch(a, b, PI/7);
  trees.push(root);
  root.branch();
}

function draw() {
  background(51);
  // let angle = angleSlider.value();

  trees.forEach(tree => {
    tree.show();
  })
}

function mousePressed() {
  trees.forEach(tree => {
    console.log("Branch!");
    tree.branch();
  })
}