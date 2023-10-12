var fieldSize;      // Tamanho do campo (1x1)
var matrizS = [];   // Matriz onde a cobra é marcada
var matrizBG = [];  //
var snake = [
    {line: 0, column: 0},
    {line: 0, column: 0},
    {line: 0, column: 0}
]; //

function start() {
    setInterval(() => {
        updateScreen();
    }, 2000);
}

/* Função que cria a tela em html e as matrizes correspondentes no JS */
function createScreen(size = 9) {
    /* Coreção do tamanho para número inteiro */
    size = parseInt(size);

    /* Coreção de tabuleiro em caso de vavlor inválido */
    if (size % 2 == 0 || size < 9) {
        size = 9;
        size = 9;
    }
    /* Variável global de tamanho do campo recebe o valor recebido por parâmetro */
    fieldSize = size;

    let n = 0;
    /* Preenchimento das matrizes e criação da tela */
    for (let l = 0; l < size; l++) {
        let section = document.createElement("section");
        section.setAttribute("class", "line");

        let lineA = [];
        let lineB = [];

        for (let c = 0; c < size; c++) {
            let div = document.createElement("div");
            div.setAttribute("id", `div${l}-${c}`);
            div.setAttribute("class", "spot");
            section.appendChild(div);

            lineA.push(0);
            lineB.push(n);
            n++;
        }

        document.getElementById("screen").appendChild(section);

        matrizS.push(lineA);
        matrizBG.push(lineB);

    }

    let row = document.querySelectorAll(".line");
    let column = document.querySelectorAll(".spot");

    for (let i = 0; i < row.length; i++) {
        row[i].style.height = `${100/size}%`;
    }

    for (let i = 0; i < column.length; i++) {
        column[i].style.width = `${100/size}%`;
    }
    
}

/* Função calcula a posição da cobra na metriz e na tela */
function createSnake() {
    let midOfField = parseInt(fieldSize/2); // coluna em que a cobra vai iniciar o jogo (meio do tabuleiro)

    snake[0].line = midOfField-1;
    snake[0].column = midOfField;

    snake[1].line =midOfField;
    snake[1].column = midOfField;

    snake[2].line =midOfField+1;
    snake[2].column = midOfField;

    setSnakePosition();
    updateScreen();
}

/* Marca a cobra na matriz */
function setSnakePosition() {
    
    for (let l = 0; l < snake.length; l++) {
        
        matrizS[snake[l].line][snake[l].column] = 1;
        
    }

}

/* Marca a cobra na tela */
function updateScreen() {

    for (let l = 0; l < fieldSize; l++) {
        for (let c = 0; c < fieldSize; c++) {

            /* Variável que contém a divi respectiva à posição da matriz */
            let spot = document.querySelector(`#div${l}-${c}`);
            /* Reseta a lista de classes, deixando marcado apenas como posição */
            spot.setAttribute("class", "spot");

            /* De acordo com o valor da matriz na posição, define a classe correspondente */
            switch (matrizS[l][c]) {
                /* Grama */
                case 0:
                    spot.classList.add("grass");
                    break;
                    /* Cobra */
                case 1:
                    spot.classList.add("snake");
                    break;
                case 2:
                    spot.classList.add("fruit")
                    break;
                default:
                    spot.classList.add("error");
                    break;
            }

        }
    }
}


function game() {
    createScreen(11);
    createSnake();
    
    //start();
    
    for (let l = 0; l < fieldSize; l++) {
        console.log(matrizS[l]);
    }

}

game();