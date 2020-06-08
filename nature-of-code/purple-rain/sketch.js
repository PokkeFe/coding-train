let drops = [];
let numDrops = 200;

function setup() {
    createCanvas(640, 480);
    for (let i = 0; i < numDrops; i++) {
        drops[i] = new Drop();
    }

}

function draw() {
    background(230, 230, 250);
    for (let drop of drops) {
        drop.fall();
        drop.show();
    }
}