// IMPORTS
import Vector3D from "./Types/Vector3D.js"
import { getState } from "./form.js"
import { logger } from "./logger.js"
// VISUAL CONFIG
const VISUALS = {
    BG: "#000000",
    POINTS: "#00ff00",
    LINES: "#00ff00"
}

let pSize = 10
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
let rs = 0.125
let dz = 1

// Visualizing Values
const points = [
    // Plane 1
    new Vector3D(0.25, 0.25, 0.25),
    new Vector3D(-0.25, 0.25, 0.25),
    new Vector3D(-0.25, -0.25, 0.25),
    new Vector3D(0.25, -0.25, 0.25),

    // Plane 2
    new Vector3D(0.25, 0.25, -0.25),
    new Vector3D(-0.25, 0.25, -0.25),
    new Vector3D(-0.25, -0.25, -0.25),
    new Vector3D(0.25, -0.25, -0.25),
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
let moving = false
let rotating = true
let pointsEnabled = false
let linesEnabled = false
//////////////////////////////////////////
// FUNCTIONS

// Util
const log = logger("index.js")

function clear() {
    CTX.fillStyle = VISUALS["BG"]
    CTX.fillRect(0, 0, Visualizer.width, Visualizer.height)
}

/**
 * @param {Vector3D} vector3D
 */
function translate_z(vector3D) {
    vector3D.z = vector3D.z + dz
    return vector3D
}

/**
 * @param {Vector3D} vector3D
 */
function rotate_on_y(vector3D) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    const x = vector3D.x * c - vector3D.z * s
    const z = vector3D.x * s + vector3D.z * c
    vector3D.x = x
    vector3D.z = z
    return vector3D
}

function fillCircle(x, y, radius) {
  CTX.beginPath();
  CTX.arc(x, y, pSize, 0, Math.PI * 2);
  CTX.fill();
}
// Work
function point({x, y}) {
    CTX.fillStyle = VISUALS["POINTS"]
    fillCircle(x, y)
}

function line(p1, p2) {
    CTX.strokeStyle = VISUALS["LINES"]
    CTX.beginPath()
    CTX.moveTo(p1.x, p1.y)
    CTX.lineTo(p2.x, p2.y)
    CTX.stroke()
}

/**
 * @param {Vector3D} vector3D
 */
function screen(vector3D) {
    return {
        x: (vector3D.x + 1)/ 2 * Visualizer.width,
        y: (1 - (vector3D.y + 1) / 2) * Visualizer.height,
    }
}

/**
 * @param {Vector3D} vector3D
 */
function project(vector3D) {
    vector3D.x = vector3D.x / vector3D.z
    vector3D.y = vector3D.y / vector3D.z
    return vector3D
}

/**
 * @param {Vector3D} vector3D
 */
function position(vector3D) {
    const v = new Vector3D(vector3D.x, vector3D.y, vector3D.z)
    return screen(project(translate_z(rotate_on_y(v))))
}

function stepTransformation() {
    if (moving) {
        dz += 1*dt
        if (pSize > 0.9) {
            pSize -= (pSize/dz) * dt
        }
    }
    
    if (rotating) {
        angle = (angle + (rs * 2 * Math.PI) * dt) % (2 * Math.PI)
    }
}

function draw() {
    clear()
    if (getState("pointsEnabled")) {
        for (const p of points) {
            point(position(p))
        }
    }
    
    if (getState("linesEnabled")) {
        for (const f of faces) {
            for (let i=0; i < f.length; ++i) {
                const a = points[f[i]]
                const b = points[f[(i+1)%f.length]]
                line(position(a),
                position(b))
                
            }
        }
    }
}
    
function render() {
    // Update Transformation Values
    stepTransformation()

    // Draw Frame
    draw()

    // Run Next Frame
    setTimeout(render, 1000/FPS);
}

function Start() {
    setTimeout(render, 1000/FPS);
}

//////////////////////////////////////////
// START
Start()
