class Grid {
    constructor(width, height, all_states) {
        let grid = []

        for (let i = 0; i < height; i++) {
            let row = []
            for (let j = 0; j < width; j++) {
                row.push(new GridState(all_states.slice(0), j, i))
            }
            grid.push(row)
        }

        this.grid = grid;
        this.width = width;
        this.height = height;

        // Generate neighbors
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let neighbors = {
                    "u": this.get(x, y - 1),
                    "r": this.get(x + 1, y),
                    "d": this.get(x, y + 1),
                    "l": this.get(x - 1, y),
                }
                this.get(x, y).setNeighbors(neighbors)
            }
        }
    }

    get(x, y) {
        if(x >= this.width || x < 0) return undefined
        if(y >= this.height || y < 0) return undefined
        return this.grid[y][x]
    }

    draw() {
        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                push()
                translate(x * 50, y * 50)
                this.get(x, y).draw()
                pop()
                
            }
        }
    }

    getMostStable() {
        let most_stable = []
        let most_stable_count = Infinity

        for(let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                let gs = this.get(x, y)
                if(gs.length > 1) {
                    if(gs.length < most_stable_count) {
                        most_stable = []
                        most_stable.push(gs)
                        most_stable_count = gs.length
                    } else if(gs.length == most_stable_count) {
                        most_stable.push(gs)
                    }
                }
            }
        }
        
        if(most_stable.length == 0) return undefined
        // randomly pick from most stable array
        return most_stable[Math.floor(Math.random() * most_stable.length)]
    }
}