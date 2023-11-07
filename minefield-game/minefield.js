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

    configureMark();
}

/* Coloca as bombas no campo */
function plantBombs(rate) {
    for (let l = 0; l < height; l++) {
        for (let c = 0; c < width; c++) {
            
            matriz[l][c] = Math.random()>rate?1:0;
            
        }
    }
}

/* Jogada, informa as bombas ao redor... ou explode */
function move(line, column, spot) {
    let bombs = 0;

    if (matriz[line][column] == 1) {
        spot.setAttribute('class', 'bomb');
        return;
    }

    for (let l = line-1; l < line+2; l++) {
        for (let c = column-1; c < column+2; c++) {
            
            if (l >= 0 && l < height && c >= 0 && c < width) {
                if (matriz[l][c] == 1) {
                    bombs++;
                }
            }

        }
    }

    spot.innerText = bombs;

}

function configureMark() {
    for (let l = 0; l < height; l++) {
        for (let c = 0; c < width; c++) {
            
            let spot = document.querySelector(`#spot${l}-${c}`);

            spot.addEventListener("contextmenu", function(event) {
                event.defaultPrevented();
                alert('aaa');
            });

        }
    }
    alert(spot);
}

function start() {
    createField();
    plantBombs(0.7);
}

start();