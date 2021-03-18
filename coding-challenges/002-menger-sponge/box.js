class Box {
    constructor(x, y, z, r_) {
        this.pos = createVector(x, y, z);
        this.r = r_;
    }

    generate() {
        let boxes = [];
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    let sum = abs(x) + abs(y) + abs(z);

                    if (sum > 1) {
                        let newRad = this.r / 3;
                        let b = new Box(this.pos.x + x * newRad, this.pos.y + y * newRad, this.pos.z + z * newRad, newRad);
                        boxes.push(b);
                    }
                }
            }
        }
        return boxes;
    }

    show() {
        noStroke();
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        box(this.r);
        pop();
    }
}