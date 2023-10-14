/* - - - Variáveis para processamento interno - - - */

var fieldSize;          // Tamanho do campo
var matriz;             // Campo
var snake;              // Cobra

var points = 0;         // Pontos
var pointsGoal;         // Meta de pontos

var key;                // Valor de qualquer tecla pressionada
var direction;          // Direção capturada por "key"

var loop;               // Loop do jogo
var finished = false;   // O jogo acabou?


/* - - - Elementos HTML - - - */

var screen = document.querySelector('#screen');     // Campo onde o é exibido
var menu = document.querySelector('#menu');         // Menu de início
var endGame = document.querySelector('#endGame');   // Tela final


/* - - - Funções, onde a mágica acontece - - - */

/* Captura do evento de teclado */
addEventListener("keydown", (event) => {
    key = event.key;
});

/* Inicia o loop de jogo, que move a cobra e atualiza a tela */
function play() {
    // loop = setInterval(() => {
    //     //mover cobra
    //     //atualizar tela
    // }, 300);
}

/* Para o loop de jogo */
function pause() {
    clearInterval(loop);
    updateScreen();
}

/* Configura o tamanho do campo e a meta de pontos, chama a função que inicia o jogo */
function configureAndStart(size, goal) {
    fieldSize = size;
    pointsGoal = goal;
    startGame();
}

/* Inicia o jogo */
function startGame() {
    createScreen();
    createSnake();
    createFruit();
    updateScreen();

    play();
}

/* Cria o campo, em matriz e em HTML  */
function createScreen() {
    /* Limpa qualquer conteúdo anterior da matriz */
    matriz = [];

    /* preenche a matriz com 0 */
    for (let i = 0; i < fieldSize; i++) {
        let row = []; // Cria uma linha
        
        for (let c = 0; c < fieldSize; c++) {
            row.push(0); // Preenche a linha com 0
        }

        matriz.push(row); // Adiciona a linha na matriz
    }

    /* Limpa qualquer conteúdo anterior do campo no HTML */
    screen.innerHTML = '';

    /* cria linhas e adiciona pontos nelas, depois as adiciona no campo */
    for (let l = 0; l < fieldSize; l++) {

        let row = document.createElement('section');    // Linha criada
        row.style.height = `${100/fieldSize}%`;         // altura da linha definida
        
        for (let c = 0; c < fieldSize; c++) {

            let spot = document.createElement('div');   // Ponto criado
            spot.setAttribute('class', 'grass');        // Ponto é marcado como grama
            spot.setAttribute('id', `spot${l}-${c}`);   // Ponto ganha um id
            spot.style.width = `${100/fieldSize}%`;     // Largura do ponto definida
            row.appendChild(spot);                      // Ponto adicionado a linha

        }

        screen.appendChild(row);                        // Linha adicionada ao campo
        
    }
}

/* Cria a cobra no centro do campo */
function createSnake() {

    /* Cento do campo (vertical e horizontal) */
    let center = parseInt(fieldSize/2); 

    /* Cria a cobra */
    snake = [
        {line: center-1,column: center},
        {line: center,column: center},
        {line: center+1,column: center}
    ];

    markSnake();
}

/* Marca a cobra no campo */
function markSnake() {
    /* Limpa a posição anterior da cobra */
    for (let l = 0; l < fieldSize; l++) {
        for (let c = 0; c < fieldSize; c++) {
            
            if (matriz[l][c] > 0) {
                matriz[l][c] = 0;
            }

        }
    }

    /* Maraca na matriz os números correspondetes a cada seção da cobra */
    for (let s = 0; s < snake.length; s++) {
        matriz[snake[s].line][snake[s].column] = s+1;
    }
}

/* Cria uma fruta em uma posição aleatória do campo */
function createFruit() {
    while (true) {
        /* Valores aleatórios para linha e coluna */
        let l = parseInt(Math.random() * fieldSize);
        let c = parseInt(Math.random() * fieldSize);

        /* Se a posição estiver vazia, coloca uma fruta e encerra a repetição */
        if (matriz[l][c] == 0) {
            matriz[l][c] = -1;
            return;
        }
        
    }
}

/* Atualiza a tela */
function updateScreen() {
    
    for (let l = 0; l < fieldSize; l++) {
        for (let c = 0; c < fieldSize; c++) {
            /* Captura o elemento correspondente à posição na matriz */
            let spot = document.querySelector(`#spot${l}-${c}`);

            /* Percorre a matriz adicionando as classes aos respectivos elementos HTML */
            switch (matriz[l][c]) {
                case -1:
                    spot.setAttribute('class', 'fruit');
                    break;
                case 0:
                    spot.setAttribute('class', 'grass');
                    break;
                default:
                    spot.setAttribute('class', 'snake');
                    break;
            }
            
        }
    }

}

configureAndStart(9, 5);