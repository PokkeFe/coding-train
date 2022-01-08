const StateImage = {}

function preload() {
    for(let state_key of Object.keys(STATE)) {
        StateImage[STATE[state_key]] = loadImage(STATE[state_key])
    }
}