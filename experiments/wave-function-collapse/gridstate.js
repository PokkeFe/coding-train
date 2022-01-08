// A GridState is the unit/position in the grid that ultimately resolves to a single eigenstate. 
class GridState {
    constructor(states, x, y) {
        this.states = states
        this.x = x
        this.y = y
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors
    }

    get length() {
        return this.states.length
    }

    update(propDirection, propStates) {
        if(this.states.length == 1) return

        let original_state_length = this.states.length
        // for each state, get the valid states from the state map
        let valid_states = []
        let valid_state_map = new Map()
        for(let propState of propStates) {
            for(let vs of StateMap.get(propState)[propDirection]) {
                if(valid_state_map.get(vs) == undefined) {
                    valid_states.push(vs)
                    valid_state_map.set(vs, true)
                }
            }
        }

        // for each of my own states, if it is not present in valid, filter it out
        this.states = this.states.filter(st => {
            return valid_states.includes(st)
        })

        if(original_state_length != this.states.length) {
            // propagate the changes to all directions
            let sorted_neighbors = (Object.keys(this.neighbors))
            .filter(key => {
                return this.neighbors[key] != undefined
            })
            .sort((a, b) => {
                return this.neighbors[a].length - this.neighbors[b].length
            })

            for(let neighbor_key of sorted_neighbors) {
                let neighbor = this.neighbors[neighbor_key]
                //neighbor.update(neighbor_key, this.states)
                update_stack.push({"x": neighbor.x, "y": neighbor.y, "propDirection": neighbor_key, "propStates": this.states.slice(0)})
            }
        }
    }

    draw() {
        if(this.states.length == 1) {
            image(StateImage[this.states[0]], 0, 0, 50, 50)
        } else if(this.states.length > 1) {
            push()
            tint(255, 120 / this.states.length)
            for(let state of this.states) {
                image(StateImage[state], 0, 0, 50, 50)
                //rect(0, 0, 20, 20)
            }
            pop()
        } else {
            push()
            fill(255, 0, 0);
            noStroke()
            rect(0, 0, 50, 50)
            pop()
        }
        // push()
        // tint(255, 10)
        // text(this.states.length, 0, 0, 20, 20)
        // pop()
    }

    // Sets new states
    set(states) {
        this.states = states
        // propagate the changes to all directions
        for(let neighbor_key of Object.keys(this.neighbors)) {
            let neighbor = this.neighbors[neighbor_key]
            if(neighbor != undefined) {
                //neighbor.update(neighbor_key, this.states)
                update_stack.push({"x": neighbor.x, "y": neighbor.y, "propDirection": neighbor_key, "propStates": this.states.slice(0)})
            }
        }

    }
}