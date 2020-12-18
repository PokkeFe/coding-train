let nodes = [];

function setup() {
  createCanvas(400,400);
  frameRate(165);
  let a = new Node();
  let b = new Node();
  let c = new Node();
  let d = new Node();
  let e = new Node();

  a.setStatic(true);
  a.setPos(width/2, height/2);

  a.addEdge(b);
  a.addEdge(c);
  b.addEdge(c);
  d.addEdge(c);
  d.addEdge(a);
  d.addEdge(e);
  e.addEdge(a);

  nodes.push(a,b,c,d,e);
}

function draw() {
  background(51);
  for(let node of nodes) {
    node.update(nodes);
  }

  for(let node of nodes) {
    node.showEdges();
  }

  for(let node of nodes) {
    node.show();
  }

}
