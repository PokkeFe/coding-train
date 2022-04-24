class Rectangle {
    constructor(x, y, w, h) {
        // vertices are vectors
        this.vertices = [];
        // add vertices clockwise
        this.vertices.push(createVector(x, y));
        this.vertices.push(createVector(x + w, y));
        this.vertices.push(createVector(x + w, y + h));
        this.vertices.push(createVector(x, y + h));
    }

    render() {
        push();
        strokeWeight(1);
        stroke(0);
        fill(255, 0, 0);
        quad(this.vertices[0].x, this.vertices[0].y,
            this.vertices[1].x, this.vertices[1].y,
            this.vertices[2].x, this.vertices[2].y,
            this.vertices[3].x, this.vertices[3].y);
        pop();
    }

    getEdges() {
        let edges = [];
        for(let vi = 0; vi < this.vertices.length; vi++) {
            let edge = new Edge(this.vertices[vi], this.vertices[(vi + 1) % this.vertices.length]);
            edges.push(edge);
        }
        return edges;
    }

    getVertices() {
        return this.vertices;
    }
}

class Triangle {
    constructor(v1, v2, v3) {
        this.vertices = [];
        this.vertices.push(v1, v2, v3);
    }

    render() {
        push();
        strokeWeight(1);
        stroke(0);
        fill(255, 0, 0);
        beginShape(TRIANGLES);
        vertex(this.vertices[0].x, this.vertices[0].y);
        vertex(this.vertices[1].x, this.vertices[1].y);
        vertex(this.vertices[2].x, this.vertices[2].y);
        endShape();
        pop();
    }

    move(x, y) {
        for(let i = 0; i < this.vertices.length; i++ ) {
            this.vertices[i].x += x;
            this.vertices[i].y += y;
        }
    }

    getEdges() {
        let edges = [];
        for(let vi = 0; vi < this.vertices.length; vi++) {
            let edge = new Edge(this.vertices[vi], this.vertices[(vi + 1) % this.vertices.length]);
            edges.push(edge);
        }
        return edges;
    }

    getVertices() {
        return this.vertices;
    }
}

class Mesh {
    constructor(tris){
        this.tris = tris; // array of triangles
    }

    render() {
        for(let tri of this.tris) {
            tri.render();
        }
    }
}

class Edge {
    constructor(v1, v2){
        this.v1 = v1;
        this.v2 = v2;
    }

    getIntersect(otherEdge) {
        let point1 = this.v1;
        let point2 = this.v2;
        let point3 = otherEdge.v1;
        let point4 = otherEdge.v2;

        const t = ((point4.x - point3.x) * (point1.y - point3.y) - 
            (point4.y - point3.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) - 
            (point4.x - point3.x) * (point2.y - point1.y));

        const x = point1.x + t * (point2.x - point1.x);
        const y = point1.y + t * (point2.y - point1.y);

        return createVector(x, y);

    }
}

class Polygon {
    constructor(verts) {
        this.vertices = verts;
    }

    render() {
        push();
        noStroke();
        fill(0, 255, 0);
        beginShape();
        for(let v of this.vertices) {
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
        pop();
    }
}