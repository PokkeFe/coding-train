/// Intellisense Support
/// <reference path="../../resrc/TSDef/p5.global-mode.d.ts" />

let rect, triangle, poly;
let overlap;
let render_text;

function setup() {
  createCanvas(400, 400);
  textSize(20);

  rect = new Rectangle(50, 50, 100, 100);

  triangle = new Triangle(createVector(100, 100),
                        createVector(200, 100),
                        createVector(175, 200));
}


function draw() {  
  background(51);
  
  // Render the base shapes
  rect.render();
  triangle.render();

  // Calculate the overlap using the Sutherland-Hodgman Algorithm
  overlap_vertices = SutherlandHodgman(triangle, rect);
  
  // Create a new Polygon from the overlap vertices
  if(overlap_vertices.length != 0){
    render_text = "Clipping";
    poly = new Polygon(overlap_vertices);
    poly.render();
  } else {
    render_text = "Not Clipping"
  }

  // Render Text
  push();
  noStroke();
  fill(255);
  text(render_text, 10, 20);
  pop();

  // Oscillate the triangle
  triangle.move(cos(frameCount/100) * 1, 0);

}

// https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm
function SutherlandHodgman(clipPolygon, subjectPolygon) {
  let clipEdges = clipPolygon.getEdges();
  let outputList = subjectPolygon.getVertices();
  let inputList = [];
  let currentPoint, prevPoint;

  for(let clipEdge of clipEdges) {
    inputList = outputList;
    outputList = [];

    for(let i = 0; i < inputList.length; i++) {
      currentPoint = inputList[i];
      prevPoint = inputList[(i-1+inputList.length)%inputList.length];

      intersectingPoint = ComputeIntersection(prevPoint, currentPoint, clipEdge)
    
      if(isInside(currentPoint, clipEdge)) {
        if(!isInside(prevPoint, clipEdge)) {
          outputList.push(intersectingPoint);
        }
        outputList.push(currentPoint);
      } else if(isInside(prevPoint, clipEdge)) {
        outputList.push(intersectingPoint);
      }
    }
  }
  return outputList;
}

function ComputeIntersection(p1, p2, edge) {
  let otherEdge = new Edge(p1, p2);
  return edge.getIntersect(otherEdge);
}

function isInside(point, edge) {
  let edgeV = p5.Vector.sub(edge.v2, edge.v1);
  let pointV = p5.Vector.sub(point, edge.v1);
  return (p5.Vector.cross(edgeV, pointV).z >= 0);

}