const STATE = {}
STATE.GGGG = "res/gggg.png" // FULL GROUND
STATE.AAAA = "res/aaaa.png" // FULL AIR
STATE.AAGG = "res/aagg.png" // HALF GROUND
STATE.GAGG = "res/gagg.png" // RIGHT TO TOP GROUND
STATE.AGGG = "res/aggg.png" // LEFT TO TOP GROUND
STATE.AGAG = "res/agag.png" // RIGHT WALL
STATE.GAGA = "res/gaga.png" // LEFT WALL
STATE.AAAG = "res/aaag.png" // RIGHT TO BOTTOM GROUND
STATE.AAGA = "res/aaga.png" // LEFT TO BOTTOM GROUND

const StateMap = new Map()

let s = STATE

/* Example

StateMap.set(E, {
    "u": [],
    "r": [],
    "d": [],
    "l": [],
})

*/

// FULL GROUND
StateMap.set(STATE.GGGG, {
    "u": [STATE.GGGG, STATE.AAGG, STATE.AGGG, STATE.GAGG],
    "r": [STATE.GGGG, STATE.GAGG, STATE.GAGA],
    "d": [STATE.GGGG],
    "l": [STATE.GGGG, STATE.AGAG, STATE.AGGG],
})

// FULL AIR
StateMap.set(s.AAAA, {
    "u": [s.AAAA],
    "r": [s.AAAA, s.AAAG, s.AGAG],
    "d": [s.AAAA, s.AAGG],
    "l": [s.AAAA, s.GAGA, s.AAGA],
})

// HALF GROUND
StateMap.set(s.AAGG, {
    "u": [s.AAAA],
    "r": [s.AAGG, s.AGGG, s.AAGA],
    "d": [s.GGGG],
    "l": [s.AAGG, s.GAGG, s.AAAG],
})

// RIGHT TO TOP GROUND
StateMap.set(s.GAGG, {
    "u": [s.GAGA, s.AAGA],
    "r": [s.AAGG, s.AGGG, s.AAAG],
    "d": [s.GGGG],
    "l": [s.GGGG, s.AGGG, s.GAGA],
})

// LEFT TO TOP GROUND
StateMap.set(s.AGGG, {
    "u": [s.AGAG, s.AAAG],
    "r": [s.GGGG, s.GAGG, s.GAGA],
    "d": [s.GGGG],
    "l": [s.AAGG, s.GAGG, s.AAAG],
})

// RIGHT WALL
StateMap.set(s.AGAG, {
    "u": [s.AGAG, s.AAAG],
    "r": [s.GGGG, s.GAGG, s.GAGA],
    "d": [s.AGAG, s.AGGG],
    "l": [s.AAAA, s.GAGA, s.AAGA],
})

// LEFT WALL
StateMap.set(s.GAGA, {
    "u": [s.GAGA, s.AAGA],
    "r": [s.AAAA, s.AGAG, s.AAGA],
    "d": [s.GAGA, s.GAGG],
    "l": [s.GGGG, s.GAGG, s.AGAG],
})

// RIGHT TO BOTTOM GROUND
StateMap.set(s.AAAG, {
    "u": [s.AAAA],
    "r": [s.AAGG, s.AGGG, s.AAGA],
    "d": [s.AGAG, s.AGGG],
    "l": [s.AAAA, s.GAGA, s.AAGA],
})

// LEFT TO BOTTOM GROUND
StateMap.set(s.AAGA, {
    "u": [s.AAAA],
    "r": [s.AAAA, s.GAGA, s.AAGA],
    "d": [s.GAGA, s.GAGG],
    "l": [s.AAGG, s.GAGG, s.AAAG],
})