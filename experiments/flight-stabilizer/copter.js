/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

class Copter {
  constructor(x, y, start_angle) {
    this.position = createVector(x, y)
    this.angle = start_angle

    this.mass = 1

    this.thruster_separation = 20;
    this.thruster_strength = 0.2;
    this.thruster_throttle_left = 0.0;
    this.thruster_throttle_right = 0.0;

    this.velocity = createVector()
    this.acceleration = createVector()
    this.angleV = 0;
    this.angleA = 0;
  }

  update() {
    // Apply forces
    // - gravity
    this.acceleration.y = 0.098

    let THRUSTER_ROT_POWER = 0.01
    this.angleA += THRUSTER_ROT_POWER * this.thruster_throttle_left * -1
    this.angleA += THRUSTER_ROT_POWER * this.thruster_throttle_right

    let thrust_vector = p5.Vector.fromAngle(this.angle).rotate(3*PI/2).mult(this.thruster_strength)

    this.acceleration.add(p5.Vector.mult(thrust_vector, this.thruster_throttle_left * this.thruster_throttle_right))


    // velocity and position calcs
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)

    this.angleV += this.angleA
    this.angle += this.angleV

    // Reset acceleration
    this.acceleration.x = 0
    this.acceleration.y = 0
    this.angleA = 0

  }

  show() {
    // Draw the body
    rectMode(CENTER)
    push()
    translate(this.position.x, this.position.y)
    rotate(this.angle)
    // Thruster Bars
    line(0, 0, 0 - this.thruster_separation, 0)
    line(0, 0, 0 + this.thruster_separation, 0)
    // Body
    rect(0, 0, 5, 5)
    triangle(2.5, 2.5, -2.5, 2.5, 0, 5)

    // Thruster Fire
    push()
    translate(this.thruster_separation, 0)
    triangle(-1, 2, 1, 2, 0, 10 * this.thruster_throttle_left)
    pop()

    push()
    translate(-this.thruster_separation, 0)
    triangle(-1, 2, 1, 2, 0, 10 * this.thruster_throttle_right)
    pop()

    // Thrusters
    rect(0 + this.thruster_separation, 0, 2, 4)
    rect(0 - this.thruster_separation, 0, 2, 4)

    pop()
  }

  setThrusters(left_throttle, right_throttle) {
    this.thruster_throttle_left = left_throttle
    this.thruster_throttle_right = right_throttle
  }
}