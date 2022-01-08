let grid
const update_stack = []
let finished = false

let all_states = []
for(let key of Object.keys(STATE)) {
  all_states.push(STATE[key])
}

function setup() {
  createCanvas(600,600);
  frameRate(300);
  grid = new Grid(5, 5, all_states)
}

function draw() {
  if(update_stack.length > 0) {
    background(51);
    let update = update_stack.pop()
    grid.get(update["x"],update["y"]).update(update["propDirection"], update["propStates"])
    grid.draw()
  } else if(!finished) {
    let most_stable = grid.getMostStable()
    if(most_stable != undefined) {
      // pick a random state from most_stable
      console.log(most_stable)
      let possible_states = most_stable.states
      let chosen_state = possible_states[Math.floor(Math.random() * possible_states.length)]
      most_stable.set([chosen_state])
    } else {
      finished = true
    }
  }
}
