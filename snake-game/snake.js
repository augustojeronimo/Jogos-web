var fieldSize;              // Tamanho do campo (1x1)
var matriz = [];            // Matriz onde a cobra é marcada
var snake = [
    {line: 0, column: 0},
    {line: 0, column: 0},
    {line: 0, column: 0}
];
var key;                    // Armazena a chave de tecla pressionada
var directionValid = "w";   // Armazena a direção quando ela é válida
var loop;                   // Armazena o loop de jogo

var points = 0;

/* Captura dos evnetos de teclado */
addEventListener("keydown", (e) => {
    key = e.key;
    validMove();
})

function mobileControl(direction) {
    key = direction;
    validMove();
}

/* Inicia o loop de jogo */
function start() {
    /* a cada 300ms move a cobra de acordo com a tecla e atualiza a tela */
    loop = setInterval(() => {
        moveSnake();
        updateScreen();
    }, 300);
}

/* Para o loop de jogo */
function stop() {
    clearInterval(loop);
}

/* Função que cria a tela no html e as matrizes correspondentes no JavaScript */
function createScreen(size = 9) {
    /* Coreção de tabuleiro em caso de vavlor inválido */
    if (size % 2 == 0 || size < 9) {
        size = 9;
    }
    /* Variável global de tamanho do campo recebe o valor recebido por parâmetro */
    fieldSize = size;

    /* Preenchimento das matrizes e criação da tela */
    for (let l = 0; l < size; l++) {
        let section = document.createElement("section");
        section.setAttribute("class", "line");

        let lineA = [];

        for (let c = 0; c < size; c++) {
            let div = document.createElement("div");
            div.setAttribute("id", `div${l}-${c}`);
            div.setAttribute("class", "spot");
            section.appendChild(div);

            lineA.push(0);
        }

        document.getElementById("screen").appendChild(section);

        matriz.push(lineA);

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

/* Função que calcula a posição da cobra na matriz */
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
    let n = 1;
    
    for (let l = 0; l < snake.length; l++) {
        
        matriz[snake[l].line][snake[l].column] = n;
        n++;
        
    }

}

/* Atualiza a tela conforme os dados armazenados */
function updateScreen() {

    for (let l = 0; l < fieldSize; l++) {
        for (let c = 0; c < fieldSize; c++) {

            /* Variável que contém a divi respectiva à posição da matriz */
            let spot = document.querySelector(`#div${l}-${c}`);
            /* Reseta a lista de classes, deixando marcado apenas como posição */
            spot.setAttribute("class", "spot");

            /* De acordo com o valor da matriz na posição, define a classe correspondente */
            switch (matriz[l][c]) {
                /* Fruta */
                case -1:
                    spot.classList.add("fruit")
                    break;
                /* Grama */
                case 0:
                    spot.classList.add("grass");
                    break;
                /* Cobra */
                default:
                    spot.classList.add("snake");
                    break;
            }

        }
    }
}

/* Impede que a direção seja contrária ao movimento */
function validMove() {
    /* Se a tecla apertada foi uma de controle, continua o teste */
    if ("awsd".includes(key)) {
        /* Para ir em uma direção, não pode estar vindo dela */
        switch (key) {
            case "w":
                if (matriz[snake[0].line-1][snake[0].column] != 2) {
                    directionValid = key;
                }
                break;
            case "s":
                if (matriz[snake[0].line+1][snake[0].column] != 2) {
                    directionValid = key;
                }
                break;
            case "a":
                if (matriz[snake[0].line][snake[0].column-1] != 2) {
                    directionValid = key;
                }
                break;
            case "d":
                if (matriz[snake[0].line][snake[0].column+1] != 2) {
                    directionValid = key;
                }
                break;
        }
    }

}

/* Realiza todos os testes necessários e move a cobra na matriz caso seja possível */
function moveSnake() {
    /* Todas as possibilidades de bater em uma parede */
    let cond1 = directionValid == "w" && snake[0].line == 0;
    let cond2 = directionValid == "s" && snake[0].line == fieldSize-1;
    let cond3 = directionValid == "a" && snake[0].column == 0;
    let cond4 = directionValid == "d" && snake[0].column == fieldSize-1;

    /* Caso tenha batido em uma parede, para o jogo e encerra a função */
    if (cond1 || cond2 || cond3 || cond4) {
        stop();
        console.log("parede!");
        return;
    }

    /* Todas as possibilidades de bater em uma parede */
    cond1 = directionValid == "w" && matriz[snake[0].line-1][snake[0].column] > 0;
    cond2 = directionValid == "s" && matriz[snake[0].line+1][snake[0].column] > 0;
    cond3 = directionValid == "a" && matriz[snake[0].line][snake[0].column-1] > 0;
    cond4 = directionValid == "d" && matriz[snake[0].line][snake[0].column+1] > 0;

    /* Caso o a cobra avance no próprio corpo, para o jogo e encerra a função */
    if (cond1 || cond2 || cond3 || cond4) {
        stop();
        console.log("corpo!");
        return;
    }

    /* Todas as possibilidades de comer uma fruta */
    cond1 = directionValid == "w" && matriz[snake[0].line-1][snake[0].column] == -1;
    cond2 = directionValid == "s" && matriz[snake[0].line+1][snake[0].column] == -1;
    cond3 = directionValid == "a" && matriz[snake[0].line][snake[0].column-1] == -1;
    cond4 = directionValid == "d" && matriz[snake[0].line][snake[0].column+1] == -1;

    /* Se comeu uma fruta, aumenta uma seção na cobra */
    if (cond1 || cond2 || cond3 || cond4) {
        snake.push({line: 0, column: 0});
        createFruit();
        console.log("fruta!");
    }

    
    /* Move o corpo, cada seção tomando o lugar próxima */
    for (let s = snake.length-1; s > 0; s--) {
        snake[s].line = snake[s-1].line;
        snake[s].column = snake[s-1].column;
    }
    /* Move a cabeça da cobra */
    switch (directionValid) {
        case "w":
            snake[0].line--;
            break;
        case "s":
            snake[0].line++;
            break;
        case "a":
            snake[0].column--;
            break;
        case "d":
            snake[0].column++;
            break;
    }

    updateMove();
}

/* Limpa o campo e remarca a cobra na posição atual */
function updateMove() {
    
    for (let l = 0; l < fieldSize; l++) {
        for (let c = 0; c < fieldSize; c++) {
            
            if (matriz[l][c] != -1) {
                matriz[l][c] = 0;
            }
            
        }
    }

    for (let s = 0; s < snake.length; s++) {
        matriz[snake[s].line][snake[s].column] = s+1;        
    }

}

/* Função que cria a fruta em um ponto livre do campo */
function createFruit() {
    while (true) {
        
        let x = parseInt(Math.random() * fieldSize-1);
        let y = parseInt(Math.random() * fieldSize-1);

        if (matriz[y][x] == 0) {
            matriz[y][x] = -1;
            return;
        }

    }
}

/* Sequencia seguida para início da partida e loop de jogo */
function game(size) {
    createScreen(size);
    createSnake();
    createFruit();
    updateScreen();
    
    setTimeout(() => {
        start();
    }, 1500);

}
/* Função que starta o jogo */
function play() {
    /* Cria o campo de acordo com o tamanho escolhido */
    let opt = document.querySelector('input[name="opt"]:checked').id;

    document.querySelector("#b1").classList.add("hidden");

    switch (opt) {
        case "opt1":
            game(9);
            break;
        case "opt2":
            game(15);
            break;
        case "opt3":
            game(21);
            break;
        default:
            console.error("Erro...");
            break;
    }
}

/* Menu */

function changeOption(btn) {
    let btns = document.querySelectorAll(".size-option");

    for (let i = 0; i < btns.length; i++) {
        btns[i].classList.remove("marked");       
    }

    btn.classList.add("marked");
}