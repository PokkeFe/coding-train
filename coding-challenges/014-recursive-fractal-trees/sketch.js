/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

var angleSlider, falloffSlider;
function setup() {
  createCanvas(400,400);
  angleSlider = createSlider(0, PI, PI / 4, 0.01).addClass("angle-slider");
  angleSlider.addClass("slider");
  falloffSlider = createSlider(0.1, 0.9, 0.5, 0.01).addClass("falloff-slider");
  falloffSlider.addClass("slider");
}

function draw() {
  background(51);
  stroke(255);
  translate(width/2, height);
  branch(100);
}

function branch(len) {
  if(len < 4) {
    return;
  }
  let angle = angleSlider.value();
  let falloff = falloffSlider.value();
  line(0, 0, 0, -len);
  translate(0,-len);
  push();
  rotate(angle);
  branch(len * falloff);
  pop();
  push();
  rotate(-angle);
  branch(len * falloff);
  pop();
}