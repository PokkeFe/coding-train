var x = 0.01
var y = 0
var z = 0

var a = 10
var b = 28
var c = 8.0/3.0

function setup() {
  // put setup code here
  createCanvas(800,600);
  background(51);
}

function draw() {
  let dt = 0.001;
  let dx = (a * (y-x)) * dt
  let dy = (x * (b - z) - y) * dt
  let dz = (x * y - c * z) * dt
  x = x + dx
  y = y + dy
  z = z + dz

  console.log(x,y,z);
}