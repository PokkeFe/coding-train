class Drop {
    constructor() {
        this.pos = createVector(random(0, width), random(-200, -100), random(0, 20));
        this.vec = createVector(1, random(1, 4));
        this.acc = createVector(0, map(this.pos.z, 0, 20, 0.3, 0.08));
        this.len = map(this.pos.z, 0, 20, 15, 3);
        this.angle = this.vec.x;
        this.thick = map(this.pos.z, 0, 20, 3, 1);
    }

    fall() {
        this.vec.add(this.acc);
        this.pos.add(this.vec);
        if (this.pos.y > height) {
            this.pos.y = random(-200, -100);
            this.vec = createVector(1, random(1, 4));
        }
        if (this.pos.x > width) {
            this.pos.x = random(-10, -50);
        }
    }

    show() {
        strokeWeight(this.thick);
        stroke(138, 43, 226);
        line(this.pos.x, this.pos.y, this.pos.x + this.angle, this.pos.y + this.len);
    }
}