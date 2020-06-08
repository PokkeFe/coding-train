class Walker {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.mass = 10;

        this.vel = p5.Vector.random2D();
    }

    update() {
        let mouse = createVector(mouseX, mouseY);
        if (!mouseIsPressed) {
            this.acc = p5.Vector.sub(mouse, this.pos);
            this.acc.setMag(0.1);
        } else {
            this.acc = createVector(0, 0);
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.force = p5.Vector.mult(this.acc, this.mass);
    }

    show() {
        stroke(255, 100);
        fill(250, 100);
        ellipse(this.pos.x, this.pos.y, 32);
    }

    showForce() {
        text('(' + this.force.x + "," + this.force.y + ")", 10, 30);
    }
}