class Grid {
    constructor(size) {
        this.size = size;
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            this.grid.push(new Array(this.size).fill(0));
        }
    }

    addNumber() {
        let grid = this.grid;
        let options = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === 0) {
                    options.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        if (options.length > 0) {
            let spot = random(options);
            grid[spot.x][spot.y] = random(1) > 0.5 ? 2 : 4;
        }
    }

    render() {
        let grid = this.grid;
        let w = width / this.size;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                push();
                let val = grid[i][j];
                fill(log(val) * 20 % 360, 100, 100);
                if(val == 0) noFill();
                strokeWeight(2);
                stroke(0);
                rect(i * w, j * w, w, w);
                if (grid[i][j] != 0) {
                    fill(0, 0, 100);
                    textAlign(CENTER);
                    textSize(w / 3);
                    text(val, i * w + w / 2, j * w + w / 1.7);
                }
                pop();
            }
        }
    }

    getCols() {
        let ret = [];
        for (let i = 0; i < this.size; i++) {
            let t = [];
            for (let j = 0; j < this.size; j++) {
                t.push(this.grid[i][j]);
            }
            ret.push(t);
        }
        return ret;
    }

    getRows() {
        let ret = [];
        for (let i = 0; i < this.size; i++) {
            let t = [];
            for (let j = 0; j < this.size; j++) {
                t.push(this.grid[j][i]);
            }
            ret.push(t);
        }
        return ret;
    }

    setCols(data) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = data[i][j];
            }
        }
    }

    setRows(data) {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.grid[j][i] = data[i][j];
            }
        }
    }

    slide(dir) {
        let before = this.getRows();
        switch (dir) {
            case LEFT:
                {
                    let rows = this.getRows();
                    for (let i in rows) {
                        rows[i] = this.slide_row(rows[i]);
                        rows[i] = this.combine_row(rows[i]);
                        rows[i] = this.slide_row(rows[i]);
                    }
                    this.setRows(rows);
                }
                break;
            case UP:
                {
                    let rows = this.getCols();
                    for (let i in rows) {
                        rows[i] = this.slide_row(rows[i]);
                        rows[i] = this.combine_row(rows[i]);
                        rows[i] = this.slide_row(rows[i]);
                    }
                    this.setCols(rows);
                }
                break;
            case RIGHT:
                {
                    let rows = this.getRows();
                    rows = this.flip(rows);
                    for (let i in rows) {
                        rows[i] = this.slide_row(rows[i]);
                        rows[i] = this.combine_row(rows[i]);
                        rows[i] = this.slide_row(rows[i]);
                    }
                    rows = this.flip(rows);
                    this.setRows(rows);
                }
                break;
            case DOWN:
                {
                    let rows = this.getCols();
                    rows = this.flip(rows);
                    for (let i in rows) {
                        rows[i] = this.slide_row(rows[i]);
                        rows[i] = this.combine_row(rows[i]);
                        rows[i] = this.slide_row(rows[i]);
                    }
                    rows = this.flip(rows);
                    this.setCols(rows);
                }
                break;

        }
        let after = this.getRows();

        if(!areEqual(before, after)){
            this.addNumber();
        }
    }

    combine_row(row) {
        let arr = [...row];
        for (let i = 0; i < arr.length - 1; i++) {
            let a = arr[i];
            let b = arr[i + 1];
            if (a == b) {
                arr[i] = a + b;
                arr[i + 1] = 0;
            }
        }
        return arr;
    }

    slide_row(row) {
        let arr = row.filter(val => val);
        let missing = row.length - arr.length;
        let zeros = Array(missing).fill(0);
        arr.push(...zeros);
        return arr;
    }

    flip(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].reverse();
        }
        return data;
    }
}

function areEqual(grid1, grid2) {
    for(let i = 0; i < grid1.length; i++) {
        for(let j = 0; j < grid1[0].length; j++) {
            if(grid1[i][j] != grid2[i][j]) return false;
        }
    }
    return true;
}