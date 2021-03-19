/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let angle;
let axiom = 'F';
let sentence = axiom;

let rules = {
  "F": "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
  len *= 0.5;
  let nextSentence = '';
  for(let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if(rules[current] != undefined) {
      nextSentence += rules[current];
    } else {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}

let p;

function setup() {
  createCanvas(400,400);
  background(51);

  angle = radians(25);

  let b = createButton("Next Sentence");
  b.mousePressed(generate)
  p = createP(sentence);
  turtle();
}

let len = 100;

function turtle() {
  background(51);
  resetMatrix();
  translate(width/2, height);
  stroke(255, 100);
  sentence.split('').forEach(current => {
    switch(current){
      case 'F':
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case '+':
        rotate(angle);
        break;
      case '-':
        rotate(-angle);
        break;
      case '[':
        push();
        break;
      case ']':
        pop();
        break;
    }
  })
}

function draw() {
}