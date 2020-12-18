class Ray {
	constructor(pos, angle) {
		this.pos = pos;
		this.dir = p5.Vector.fromAngle(angle);
		this.drawMag = 20;
	}

	rotate(angle) {
		let a = degrees(angle);
		let x1 = this.dir.x;
		let y1 = this.dir.y;
		let x2 = cos(a)*x1 - sin(a)*y1;
		let y2 = sin(a)*x1 + cos(a)*y1;
		this.dir.set(x2, y2);
	}

	setAngle(angle) {
		this.dir = p5.Vector.fromAngle(angle);
	}

	show() {
		let drawMag = this.drawMag;
		stroke(255);
		push();
		translate(this.pos.x, this.pos.y);
		line(0, 0, this.dir.x*drawMag, this.dir.y*drawMag);
		pop();
	}
	
	lookAt(x, y) {
		this.dir.x = x - this.pos.x;
		this.dir.y = y - this.pos.y;
		this.dir.normalize();
	}

	cast(other) {
		const x1 = other.a.x;
		const y1 = other.a.y;
		const x2 = other.b.x;
		const y2 = other.b.y;

		const x3 = this.pos.x;
		const y3 = this.pos.y;
		const x4 = this.pos.x + this.dir.x;
		const y4 = this.pos.y + this.dir.y;

		const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
		if (den == 0) {
			return;
		}

		const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
		const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

		let data = {
			u: u
		}

		if(t > 0 && t < 1 && u > 0) {
			const pt = createVector();
			pt.x = x1 + t * (x2-x1);
			pt.y = y1 + t * (y2 - y1);
			data.pt = pt;
			return data;
		} else {
			return;
		}

		
	}
}