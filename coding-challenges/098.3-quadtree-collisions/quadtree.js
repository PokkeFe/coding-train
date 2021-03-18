class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(p) {
        return (p.x > this.x - this.w &&
                p.x < this.x + this.w &&
                p.y > this.y - this.h &&
                p.y < this.y + this.h);
    }

    intersects(rect) {
        return !(   rect.x - rect.w > this.x + this.w ||
                    rect.x + rect.w < this.x - this.w ||
                    rect.y - rect.h > this.y + this.h ||
                    rect.y + rect.h < this.y - this.h); 
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    insert(p) {

        if(!this.boundary.contains(p)) {
            return;
        }

        if(!this.divided){
            if(this.points.length < this.capacity) {
                this.points.push(p);
            } else {
                this.subdivide();
                this.insert(p);
            }
        } else {
            this.ne.insert(p);
            this.se.insert(p);
            this.sw.insert(p);
            this.nw.insert(p);
        }
    }
    
    subdivide() {
        let neBoundary = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        this.ne = new QuadTree(neBoundary, this.capacity);

        let seBoundary = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        this.se = new QuadTree(seBoundary, this.capacity);
        
        let swBoundary = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        this.sw = new QuadTree(swBoundary, this.capacity);

        let nwBoundary = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        this.nw = new QuadTree(nwBoundary, this.capacity);

        this.divided = true;

        for(let p of this.points) {
            this.insert(p);
        }
        this.points = [];
    }

    query(range) {
        let found = [];

        if(!this.boundary.intersects(range)) {
            return found;
        } else {
            if(this.divided) {
                found = found.concat(
                    this.ne.query(range),
                    this.se.query(range),
                    this.sw.query(range),
                    this.nw.query(range)
                );
            } else {
                for(let p of this.points) {
                    if(range.contains(p)) {
                        found.push(p);
                    }
                }
            }
            return found;
        }
    }

    draw() {

        // draw box
        push();
        rectMode(RADIUS);
        stroke(0);
        strokeWeight(1);
        noFill();
        rect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
        pop();

        // draw children
        if(this.ne) this.ne.draw();
        if(this.se) this.se.draw();
        if(this.sw) this.sw.draw();
        if(this.nw) this.nw.draw();
    }
}