// VISUAL CONFIG
const BG = "#000000"
const POINTS = "#00ff00"
const pSize = 15 
Visualizer.width = 800
Visualizer.height = 800

// Get Context
const CTX = Visualizer.getContext("2d")


// FUNCTIONS

// UTIL
function clear() {
    CTX.fillStyle = BG
    CTX.fillRect(0, 0, Visualizer.width, Visualizer.height)
}

// WORK
function point({x, y}) {
    CTX.fillStyle = POINTS
    CTX.fillRect(x - pSize / 2, y - pSize / 2, pSize, pSize)
}

function screen(p) {
    return {
        x: (p.x + 1)/ 2 * Visualizer.width,
        y: (1 - (p.y + 1) / 2) * Visualizer.height,
    }
}

// START
clear()
point(screen({x: 0, y: 0.5}))