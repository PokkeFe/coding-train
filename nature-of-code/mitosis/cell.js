class Cell {

    constructor(x, y, r, c, ms) {
        this.pos = createVector(x, y);
        this.r = r;
        this.vel = createVector();
        this.c = c;
        this.perlinOffset = random(0, 100000000);
        this.perlinSpeed = random(0.02, 0.05);
        this.maxSpeed = ms || 3;
        this.pullVec = null;
        console.log(this.maxSpeed, ms);
    }

    move() {
        let newXV = map(noise(this.perlinOffset), 0, 1, -this.maxSpeed, this.maxSpeed);
        let newYV = map(noise(this.perlinOffset + 1000), 0, 1, -this.maxSpeed, this.maxSpeed);
        this.vel = createVector(newXV, newYV);

        // Set Attraction
        this.pullVec = this.getVecToMouse();
        let d = dist(mouseX,mouseY,this.pos.x,this.pos.y)
        let newMag = map(d,5, 200, 0.2, 1);
        console.log(d);
        this.pullVec.setMag(newMag);
        if(this.pullVec != null) {
            this.vel.add(this.pullVec);
        }


        this.pos.add(this.vel);
        this.perlinOffset += this.perlinSpeed;

        this.pos.x = constrain(this.pos.x, 0 + this.r / 2, width - this.r / 2);
        this.pos.y = constrain(this.pos.y, 0 + this.r / 2, height - this.r / 2);
    }

    show() {
        push();
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        pop();
    }

    clicked(x, y) {
        let d = dist(this.pos.x, this.pos.y, x, y);
        if (d <= this.r) {
            return true;
        } else {
            return false;
        }
    }

    split() {
        let cellA = new Cell(this.pos.x, this.pos.y, this.r / 2, this.c);
        let cellB = new Cell(this.pos.x, this.pos.y, this.r / 2, this.c);
        let cells = [cellA, cellB];
        return cells;
    }

    getVecToMouse() {
        let x = mouseX - this.pos.x;
        let y = mouseY - this.pos.y;
        return createVector(x,y);
    }
}