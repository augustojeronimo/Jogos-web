var field;          // Campo

var width = 50;     // Largura do campo
var height = 30;    // Altura do campo

/* Elementos HTML */
var screen = document.querySelector('#screen');

function createScreen() {
    /* Matriz */
    field = [];

    for (let h = 0; h < height; h++) {
        let line = [];

        for (let w = 0; w < width; w++) {
            
            line.push(0);

        }

        field.push(line);
    }

    /* HTML */
    for (let h = 0; h < height; h++) {
        let line = document.createElement('section');
        line.style.height = `${100/height}%`;

        for (let w = 0; w < width; w++) {
            
            let spot = document.createElement('div');
            spot.setAttribute('id', `spot${h}-${w}`);
            spot.style.width = `${100/width}%`;

            line.appendChild(spot);

        }

        screen.appendChild(line);
        
    }

}

createScreen();