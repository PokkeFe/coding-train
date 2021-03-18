class Particle {
	constructor(){
		this.pos = createVector(width/2, height/2);
		this.rays = [];
		for(let a = 0; a < 360; a += 10) {
			this.rays.push(new Ray(this.pos, radians(a)));
		}
	}
	
	show() {
		fill(255);
		ellipse(this.pos.x, this.pos.y, 16);
		for(let ray of this.rays) {
			ray.show();
		}
	}

	look(other) {
		for(let ray of this.rays) {
			let record = Infinity;
			let closest = null;
			for(let wall of walls) {
				const data = ray.cast(wall);
				if(data) {
					const d = data.u;
					if(d < record) {
						record = d;
						closest = data.pt;
					}

				}
			}
			if(closest) {
				push();
				strokeWeight(1);
				line(this.pos.x, this.pos.y, closest.x, closest.y);
				strokeWeight(4);
				point(closest.x, closest.y);
				pop();
			}
		}
	}

	setPos(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}
}