class Snake {
    constructor() {
        this.pos = createVector(0, 0);
        this.vel = createVector(1, 0);
        this.total = 0;
        this.tail = [];
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = this.pos.copy();
        this.pos.add(p5.Vector.mult(this.vel, scl));


        this.pos.x = constrain(this.pos.x, 0, width - scl);
        this.pos.y = constrain(this.pos.y, 0, height - scl);
    }

    show() {
        fill(255);
        noStroke();
        rect(this.pos.x, this.pos.y, scl, scl);
        for (let spot of this.tail) {
            rect(spot.x, spot.y, scl, scl);
        }
    }

    dir(x, y) {
        this.vel = createVector(x, y);
    }

    eat(loc) {
        let d = dist(this.pos.x, this.pos.y, loc.x, loc.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    death() {
        for (let pos of this.tail) {
            let d = dist(pos.x, pos.y, this.pos.x, this.pos.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}