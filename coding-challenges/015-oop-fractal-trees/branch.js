class Branch {
    constructor(begin, end, angle) {
        this.begin = begin;
        this.end = end;
        this.branched = false;
        this.angle = angle;
        this.falloff = 0.8
    }

    branch() {
        if(!this.branched){
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.setMag(dir.mag() * this.falloff);
            let angle = this.angle
            
            let rightDir = dir.copy();
            rightDir.rotate(angle);
            let rightEnd = p5.Vector.add(this.end, rightDir);
            this.right = new Branch(this.end, rightEnd, angle);
            
            let leftDir = dir.copy();
            leftDir.rotate(-angle);
            let leftEnd = p5.Vector.add(this.end, leftDir);
            this.left = new Branch(this.end, leftEnd, angle);
            this.branched = true;
        } else {
            this.right.branch();
            this.left.branch();
        }
    }

    show() {
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        if(this.branched) {
            this.right.show();
            this.left.show();
        } else {
            push();
            fill(255, 200, 200, 150);
            noStroke();
            ellipse(this.end.x, this.end.y, 20, 20);
            pop();
        }
    }
}