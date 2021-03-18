class Star {

    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(0, height);
        this.pz = this.z;
    }

    update() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = height;
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
            this.pz = this.z;
        }
    }

    draw() {
        fill(255);
        noStroke();
        stroke(255);

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);
        let r = map(this.z, 0, width, 16, 0);

        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        line(px, py, sx, sy);

        ellipse(sx, sy, r, r);
    }
}