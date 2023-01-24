/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let copter
let left_throttle, right_throttle

function setup() {
  createCanvas(800,800)
  frameRate(30)

  copter = new Copter(width/2, height/2, 0)
}

function draw() {
  background(51)
  left_throttle = 0
  right_throttle = 0
  if (keyIsDown(LEFT_ARROW)) {
    left_throttle = 1
  }
  if (keyIsDown(RIGHT_ARROW)) {
    right_throttle = 1
  }
  if(keyIsDown(UP_ARROW)) {
    left_throttle = 1
    right_throttle = 1
  }
  copter.setThrusters(left_throttle, right_throttle)
  copter.update()
  copter.show()

  text(copter.thruster_throttle_left, 10, 10);
  text(copter.thruster_throttle_right, 10, 20);
}