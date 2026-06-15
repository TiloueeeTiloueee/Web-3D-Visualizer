let state = {
    moving: false,
    rotating: true,
    pointsEnabled: true,
    linesEnabled: true,
}

const radios = {
    lines: document.querySelectorAll('input[name="lines"]'),
    points: document.querySelectorAll('input[name="points"]')
}

for (const name in radios) {
    const radio = radios[name]
    radio.forEach(input => {
        input.addEventListener('change', (event) => {
            if (event.target.checked) {
                const key = event.target.dataset.key;
                const result = event.target.value === "enabled"
                state[key] = result
            }
        })
    })
}
/**
 * 
 * @param {string} key
 */
export function getState(key) {
    return state[key]
}


