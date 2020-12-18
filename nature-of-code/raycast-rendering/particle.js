class Particle {
	constructor(){
		this.pos = createVector(sceneW/2, sceneH/2);
		this.heading = 0;
		this.rays = [];
		this.speed = 1;
		this.fov = 50;
		let fov = this.fov;
		for(let a = -this.fov/2; a < this.fov/2; a += 0.25) {
			this.rays.push(new Ray(this.pos, radians(a)));
		}
	}
	
	show() {
		push();
		fill(255);
		ellipse(this.pos.x, this.pos.y, 16);
		for(let ray of this.rays) {
			ray.show();
		}
		fill(255, 0, 0);
		stroke(255, 0, 0);
		strokeWeight(2);
		let end = p5.Vector.fromAngle(this.heading);
		end.setMag(10);
		line(this.pos.x, this.pos.y, this.pos.x + end.x, this.pos.y + end.y)
		pop();
	}

	look(other) {
		let scene = [];
		for(let i = 0; i < this.rays.length; i++) {
			let ray = this.rays[i];
			let theta = map(i, 0, this.rays.length, -(this.fov/2), this.fov/2);
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
			scene[i] = record * cos(radians(theta));
			if(keyIsDown(SHIFT)) {
				scene[i] = record;
			}
		}
		return scene;
	}

	update() {
		if(keyIsDown(LEFT_ARROW)) {
			this.rotate(-0.05);
		}
		if(keyIsDown(RIGHT_ARROW)) {
			this.rotate(0.05);
		}
		if(keyIsDown(UP_ARROW)) {
			let move = p5.Vector.fromAngle(this.heading);
			move.setMag(this.speed);
			this.pos.add(move);
		}
		if(keyIsDown(DOWN_ARROW)) {
			let move = p5.Vector.fromAngle(this.heading);
			move.setMag(-this.speed);
			this.pos.add(move);
		}
	}

	rotate(angle) {
		this.heading += angle;
		for(let i = 0; i < this.rays.length; i += 1) {
			let a = map(i, 0, this.rays.length, -(this.fov/2), this.fov/2);
			this.rays[i].setAngle(this.heading + radians(a));
		}
	}
}