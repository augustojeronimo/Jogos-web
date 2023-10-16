/* - - - Variáveis para processamento interno - - - */

var fieldSize;          // Tamanho do campo
var matriz;             // Campo
var snake;              // Cobra

var points = 0;             // Pontos
var pointsGoal;         // Meta de pontos

var key;                // Valor de qualquer tecla pressionada
var direction;          // Direção capturada por "key"

var loop;               // Loop do jogo
var finished;           // O jogo acabou?
var win;                // Houve vitória


/* - - - Elementos HTML - - - */

var screen = document.querySelector('#screen');     // Campo onde o é exibido
var timer = document.querySelector('#timer');       // Contagem regressiva
var menu = document.querySelector('#menu');         // Menu de início
var endGame = document.querySelector('#endGame');   // Tela final
var message = document.querySelector('#message');   // Mensagem de vitória/derrota
var score = document.querySelector('#score');       // Pontuação


/* - - - Funções, onde a mágica acontece - - - */

/* Captura do evento de teclado */
addEventListener("keydown", (event) => {
    key = event.key;

    keyAction();
});

/* Decide o que fazer de acordo com a tecla pressionada */
function keyAction() {
    /* Caso seja uma tecla direcional (a, w, s, d ou setas) */
    if ('awsd'.includes(key) || key.includes('Arrow')) {
        /* Atribui a nova direção de acordo com a tecla e a direção anterior da cobra */
        if ((key == 'w' || key == 'ArrowUp') && snake[0].line <= snake[1].line) {
            direction = '^'; // cima
        } else if ((key == 's' || key == 'ArrowDown') && snake[0].line >= snake[1].line) {
            direction = 'v'; // baixo
        } else if ((key == 'a' || key == 'ArrowLeft') && snake[0].column <= snake[1].column) {
            direction = '<'; // esquerda
        } else if ((key == 'd' || key == 'ArrowRight') && snake[0].column >= snake[1].column) {
            direction = '>'; // direito
        }
    }
}

/* Inicia o loop de jogo, que move a cobra e atualiza a tela */
function play() {
    /*Contagem regressiva*/
    let seconds = 3;

    let timerLoop = setInterval(() => {
        /* Conta até 0, então para o timer e inicia o loop de jogo */
        if (seconds > 0) {
            timer.innerText = seconds;
        } else {
            timer.innerText = '';
            clearInterval(timerLoop);

            /* Loop de jogo que move a cobra e atualiza a tela até que o jogo acabe */
            loop = setInterval(() => {
                moveSnake();
                updateScreen();
        
                if (finished) {
                    manageScreen(endGame, 'block');
                    pause();
                }
            }, 350);

        }

        seconds--;
    }, 1000);

    
}

/* Para o loop de jogo */
function pause() {
    clearInterval(loop);
    updateScreen();
}

/* Reseta as variáveis para início de jogo */
function reset() {
    finished = false;
    win = false;
    points = 0;
    direction = '^';
}

function manageScreen(scr, state) {
    scr.style.display = state;

    score.innerText = points;

    if (win) {
        message.innerText = 'Victory';
    } else {
        message.innerText = 'Game over'
    }
}

/* Configura o tamanho do campo e a meta de pontos, chama a função que inicia o jogo */
function configureAndStart(size, goal) {
    fieldSize = size;
    pointsGoal = goal;
    startGame();
}

/* Inicia o jogo */
function startGame() {
    /* Menus desaparecem */
    manageScreen(menu, 'none')
    manageScreen(endGame, 'none');

    /* Reseta o jogo e cria o ambiente */
    reset();
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

/* Move a cobra de acordo com a direção escolhida */
function moveSnake() {
    /* Se houve colisão, não move a cobra */
    if (lose()) {
        pause();
        return;
    }

    /* Move cada seção da cobra para a proxima posição, a partir do fim */
    for (let s = snake.length-1; s > 0; s--) {
        
        snake[s].line = snake[s-1].line;
        snake[s].column = snake[s-1].column;
        
    }

    /* Move a cabeça da cobra na direção escolhida */
    switch (direction) {
        case '^':
            snake[0].line--;
            break;
        case 'v':
            snake[0].line++;
            break;
        case '<':
            snake[0].column--;
            break;
        case '>':
            snake[0].column++;
            break;
        default:
            console.log('Algo de errado não está certo...');
            break;
    }

    /* Marca a alteração na matriz */
    markSnake();
}

/*  Checa a colisão da cobra com o corpo e as paredes, contabiliza os pontos.
    Retorna true se o jogo acabou, seja por derrota ou vitória */
function lose() {
    /* Possibilidades de bater em uma parede */
    if (direction == '^' && snake[0].line == 0) {
        /* Bateu no teto */
        finished = true;
        return true;
    } else if (direction == 'v' && snake[0].line == fieldSize-1) {
        /* Bateu no chão */
        finished = true;
        return true;
    } else if (direction == '<' && snake[0].column == 0) {
        /* Bateu na parede da esquerda */
        finished = true;
        return true;
    } else if (direction == '>' && snake[0].column == fieldSize-1) {
        /* Bateu na parede da direita */
        finished = true;
        return true;
    }

    /* proxima posição */
    let nextPosition;

    switch (direction) {
        case '^':
            nextPosition = matriz[snake[0].line-1][snake[0].column]
            break;
        case 'v':
            nextPosition = matriz[snake[0].line+1][snake[0].column]
            break;
        case '<':
            nextPosition = matriz[snake[0].line][snake[0].column-1]
            break;
        case '>':
            nextPosition = matriz[snake[0].line][snake[0].column+1]
            break;
        default:
            console.log('Algo de errado definitivamente não está certo...');
            break;
    }

    /* Proxima posição é ocupada pelo corpo da cobra */
    if (nextPosition > 0) {
        finished = true;
        return true;
    }


    /* Proxima posição é ocupada por uma fruta */
    if (nextPosition == -1) {
        /* Adiciona um ponto, uma seção na cobra e cria uma nova fruta */
        points++;
        snake.push({line: 0, column:0});
        createFruit();
    }

    /* Se atingiu a meta de pontos, declara vitória e jogo finalizado */
    if (points == pointsGoal) {
        win = true;
        finished = true;
    }

    return false;

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