/* - - - Variáveis para processamento interno - - - */
var matriz;

var width = 12;
var height = 18;

/* - - - Elementos HTML - - - */
var field = document.querySelector('#field');


/* - - - Funções - - - */

/* Cria o campo como matriz e no HTML */
function createField() {
    /* Campo como matriz */
    matriz = []; // Reseta a matriz

    for (let l = 0; l < height; l++) {
        let row = [];

        for (let c = 0; c < width; c++) {
            
            row.push(0);
            
        }

        matriz.push(row);
    }

    /* Campo como HTML */
    field.innerHTML = ''; // Reseta elemento

    for (let l = 0; l < height; l++) {
        /* Cria a linha */
        let line = document.createElement('section');
        line.style.height = `${100/height}%`;
        line.style.display = 'flex';

        for (let c = 0; c < width; c++) {
            /* Cria o ponto */
            let spot = document.createElement('div');
            spot.style.width = `${100/width}%`;
            spot.setAttribute('id', `spot${l}-${c}`);
            spot.setAttribute('onclick', `move(${l},${c},this)`);
            line.appendChild(spot);
            
        }

        field.appendChild(line)
    }


}

/* Jogada, informa as bombas ao redor... ou explode */
function move(line, column, spot) {
    console.log(line +' '+column+' '+spot);
}

createField();