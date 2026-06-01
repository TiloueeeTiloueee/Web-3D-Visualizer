// VISUAL CONFIG
const BG = "#000000"
const POINTS = "#00ff00"
const LINES = "#00ff00"
const pSize = 5 
Visualizer.width = 800
Visualizer.height = 800
const FPS = 60

//////////////////////////////////////////

// Get Context
const CTX = Visualizer.getContext("2d")

//////////////////////////////////////////
// WORK VARS/CONSTS

// Frame Values
const dt = 1/FPS
let dz = 1

// Visualizing Values
const points = [
    // Plane 1
    {x: 0.25, y: 0.25, z: 0.25},
    {x: -0.25, y: 0.25, z: 0.25},
    {x: -0.25, y: -0.25, z: 0.25},
    {x: 0.25, y: -0.25, z: 0.25},

    // Plane 2
    {x: 0.25, y: 0.25, z: -0.25},
    {x: -0.25, y: 0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},
    {x: 0.25, y: -0.25, z: -0.25},
]

const faces = [
    [0, 1, 2, 3],
    [4, 5, 6, 7,],
    [0, 4],
    [2, 6],
    [1, 5],
    [3, 7],
]

// Animation Values
let angle = 0

//////////////////////////////////////////
// FUNCTIONS

// Util
function clear() {
    CTX.fillStyle = BG
    CTX.fillRect(0, 0, Visualizer.width, Visualizer.height)
}

function translate_z({x, y, z}) {
    return {x: x, y: y, z: z + dz}
}

function rotate_on_y({x, y, z}) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {
        x: x * c - z * s,
        y,
        z: x * s + z * c,
    }
}

function fillCircle(x, y, radius) {
  CTX.beginPath();
  CTX.arc(x, y, pSize, 0, Math.PI * 2);
  CTX.fill();
}
// Work
function point({x, y}) {
    CTX.fillStyle = POINTS
    fillCircle(x, y)
}

function line(p1, p2) {
    CTX.strokeStyle = LINES
    CTX.beginPath()
    CTX.moveTo(p1.x, p1.y)
    CTX.lineTo(p2.x, p2.y)
    CTX.stroke()
}

function screen(p) {
    return {
        x: (p.x + 1)/ 2 * Visualizer.width,
        y: (1 - (p.y + 1) / 2) * Visualizer.height,
    }
}

function project({x, y, z}) {
    return {
        x: x / z,
        y: y / z,
    }
}

function render() {
    //dz += 1*dt
    angle += 2*Math.PI*dt / 8
    clear()
    // Rendering Points
    for (const p of points) {
        point(screen(project(translate_z(rotate_on_y(p)))))
    }
    // Rendering Lines
    for (const f of faces) {
        for (let i=0; i < f.length; ++i) {
            const a = points[f[i]]
            const b = points[f[(i+1)%f.length]]
            line(screen(project(translate_z(rotate_on_y(a)))),
            screen(project(translate_z(rotate_on_y(b)))))
            
        }
    }
    
    setTimeout(render, 1000/FPS);
}
//////////////////////////////////////////
// START
setTimeout(render, 1000/FPS);
