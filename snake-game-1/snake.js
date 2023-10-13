/* - - - Variáveis para processamento interno - - - */

var fieldSize;          // Tamanho do campo
var matriz = [];        // Campo
var snake = [
    // Cobra (3 seções)
    {line: 0,column: 0},
    {line: 0,column: 0},
    {line: 0,column: 0}
];

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

//...