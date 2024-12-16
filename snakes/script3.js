var GAME = {
    width: 928,
    height: 928,
    background: "black",
    cellSize: 32
}

var SNAKE1 = {
    x: 320,
    y: 320,
    xDir: GAME.cellSize,
    speed: GAME.cellSize,
    yDir: 0, // т.к. на старте двигается горизонтально
    tail: [], //хвост змейки(сначала пустой)
    maxTail: 1, //начальная длина змейки
    color: 'green',
    score: 0
}

var SNAKE2 = {
    x:160,
    y: 160,
    xDir: GAME.cellSize,
    speed: GAME.cellSize,
    yDir: 0, // т.к. на старте двигается горизонтально
    tail: [], //хвост змейки(сначала пустой)
    maxTail: 1, //начальная длина змейки
    color: 'blue',
    score: 0
}

var APPLE = {
    x: randomInt(2, 27) * GAME.cellSize,
    y: randomInt(2, 27) * GAME.cellSize,
    color: new Image(),
    src: 'public/images/img.png',
    isImgLoad: false,
    nom: new Audio('public/sounds/nomnom.mp3'),
    audioIsOn: true,
    fail: new Audio('public/sounds/fail.mp3')
}

APPLE.color.src = APPLE.src;
APPLE.color.onload = () => {
    APPLE.isImgLoad = true;
};

var canvas = document.getElementById('canvas'); // получение объекта холста
canvas.width = GAME.width; // устанавливаем ширину холста
canvas.height = GAME.height; // устанавливаем высоту холста
var canvasContext = canvas.getContext('2d'); // получение инструмента для рисования

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}

function drawFrame() {
    canvasContext.fillStyle = '#B1F6BD';
    canvasContext.fillRect(0,0,GAME.width,GAME.cellSize * 2);
    canvasContext.fillRect(0,0,GAME.cellSize * 2,GAME.height);
    canvasContext.fillRect(0,GAME.height - GAME.cellSize * 2, GAME.width, GAME.cellSize *2);
    canvasContext.fillRect(GAME.width - GAME.cellSize * 2, 0, GAME.cellSize * 2, GAME.height);
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawScore1() {
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = 'green';
    canvasContext.fillText("Score2: " + SNAKE1.score, 500, 50);
}

function drawScore2() {
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = 'blue';
    canvasContext.fillText("Score1: " + SNAKE2.score, 10, 50);
}

function drawGrid() {

    // рисуем вертикальные линии
    for (let x = 0; x <= GAME.width; x += GAME.cellSize) {
        canvasContext.beginPath();
        canvasContext.lineWidth = 1;
        canvasContext.moveTo(x, 0);
        canvasContext.lineTo(x, GAME.height);
        canvasContext.strokeStyle = 'white';
        canvasContext.closePath();
        canvasContext.stroke();
    }
    for (let y = 0; y <= GAME.height; y += GAME.cellSize) {
        canvasContext.beginPath();
        canvasContext.lineWidth = 1;
        canvasContext.moveTo(0, y);
        canvasContext.lineTo(GAME.width, y);
        canvasContext.strokeStyle = 'white';
        canvasContext.closePath();
        canvasContext.stroke();
    }
}


function drawApple() {
    if (APPLE.isImgLoad) {
        canvasContext.drawImage(APPLE.color, APPLE.x, APPLE.y, GAME.cellSize, GAME.cellSize);
    }
}

function soundApple() {
    if (APPLE.audioIsOn) {
        APPLE.nom.play();
    }
}

function soundFail(){
    if (APPLE.audioIsOn) {
        APPLE.fail.play();
    }
}

let gameOver = false;


function resetGame() {
    // Сбрасываем все параметры игры
    SNAKE1.x = 320;
    SNAKE1.y = 320;
    SNAKE1.xDir = GAME.cellSize;
    SNAKE1.yDir = 0;
    SNAKE1.tail = [];
    SNAKE1.maxTail = 1;
    SNAKE1.score = 0;
    SNAKE2.x = 160;
    SNAKE2.y = 160;
    SNAKE2.xDir = GAME.cellSize;
    SNAKE2.yDir = 0;
    SNAKE2.tail = [];
    SNAKE2.maxTail = 1;
    SNAKE2.score = 0;

    APPLE.x = randomInt(2, 27) * GAME.cellSize;
    APPLE.y = randomInt(2, 27) * GAME.cellSize;

    gameOver = false;

    updateSnake()
}

function updateSnake1(){
    SNAKE1.x += SNAKE1.xDir;
    SNAKE1.y += SNAKE1.yDir;
    if (SNAKE1.x < GAME.cellSize * 2) {
        SNAKE1.x = GAME.width - GAME.cellSize * 3;
    }
    else if (SNAKE1.x >= GAME.width - GAME.cellSize * 2) {
        SNAKE1.x = GAME.cellSize * 2;
    }
    if (SNAKE1.y < GAME.cellSize * 2) {
        SNAKE1.y = GAME.height - GAME.cellSize * 3;
    }
    else if (SNAKE1.y >= GAME.height - GAME.cellSize * 2) {
        SNAKE1.y = GAME.cellSize * 2;
    }

    SNAKE1.tail.unshift({ x: SNAKE1.x, y: SNAKE1.y });
    if (SNAKE1.tail.length > SNAKE1.maxTail) {
        SNAKE1.tail.pop();
    }
}

function updateSnake2(){
    SNAKE2.x += SNAKE2.xDir;
    SNAKE2.y += SNAKE2.yDir;
    if (SNAKE2.x < GAME.cellSize * 2) {
        SNAKE2.x = GAME.width - GAME.cellSize * 3;
    }
    else if (SNAKE2.x >= GAME.width - GAME.cellSize * 2) {
        SNAKE2.x = GAME.cellSize * 2;
    }
    if (SNAKE2.y < GAME.cellSize * 2) {
        SNAKE2.y = GAME.height - GAME.cellSize * 3;
    }
    else if (SNAKE2.y >= GAME.height - GAME.cellSize * 2) {
        SNAKE2.y = GAME.cellSize * 2;
    }

    SNAKE2.tail.unshift({ x: SNAKE2.x, y: SNAKE2.y });
    if (SNAKE2.tail.length > SNAKE2.maxTail) {
        SNAKE2.tail.pop();
    }
}

function tailSnake1(){
    canvasContext.fillStyle = SNAKE1.color;
    SNAKE1.tail.forEach(function (cell, index) {
        canvasContext.fillRect(cell.x, cell.y, GAME.cellSize - 1, GAME.cellSize - 1);
        if (cell.x === APPLE.x && cell.y === APPLE.y) {
            SNAKE1.maxTail += 1;
            SNAKE1.score += 1;
            APPLE.x = randomInt(2,27) * GAME.cellSize;
            APPLE.y = randomInt(2, 27) * GAME.cellSize;
            soundApple();
        }

        for (var i = index + 1; i < SNAKE1.tail.length; i++) {
            if (cell.x === SNAKE1.tail[i].x && cell.y === SNAKE1.tail[i].y) {
                gameOver = true;
                soundFail();
                break;
            }
        }
    })
}

function tailSnake2(){
    canvasContext.fillStyle = 'blue';
    SNAKE2.tail.forEach(function (cell, index) {
        canvasContext.fillRect(cell.x, cell.y, GAME.cellSize - 1, GAME.cellSize - 1);
        if (cell.x === APPLE.x && cell.y === APPLE.y) {
            SNAKE2.maxTail += 1;
            SNAKE2.score += 1;
            APPLE.x = randomInt(2,27) * GAME.cellSize;
            APPLE.y = randomInt(2, 27) * GAME.cellSize;
            soundApple();
        }

        for (var i = index + 1; i < SNAKE2.tail.length; i++) {
            if (cell.x === SNAKE2.tail[i].x && cell.y === SNAKE2.tail[i].y) {
                gameOver = true;
                soundFail();
                break;
            }
        }
    })
}

function updateSnake() {

    if (gameOver) 
        return;
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawFrame();
//    drawGrid();
    updateSnake1();
    updateSnake2();

    drawApple();

    tailSnake1();
    tailSnake2();

    drawScore1();
    drawScore2();

    if (gameOver) {
        drawBackground();
        canvasContext.font = '48px Arial';
        canvasContext.fillStyle = 'blue';
        if (SNAKE1.score > SNAKE2.score){
            canvasContext.fillText('Player 2 win', 250, 352);
            canvasContext.fillText('Your scores: ' + SNAKE1.score + ' , ' + SNAKE2.score, 200, 500);
        }
        if (SNAKE2.score > SNAKE1.score){
            canvasContext.fillText('Player 1 win', 250,352);
            canvasContext.fillText('Your scores: ' + SNAKE1.score + ' , ' + SNAKE2.score, 200, 500);
        }
        if (SNAKE1.score === SNAKE2.score) {
            canvasContext.fillText("Ничья", 200, 500);
        }
        
    }
    
}

// function updateSnake() {

//     if (gameOver) 
//         return;
//     canvasContext.clearRect(0, 0, GAME.width, GAME.height);
//     drawBackground();
//     drawGrid();
//     drawScore1();
//     drawScore2();
//     for (var i = 0; i < 2; i++){
//         SNAKE[i].x += SNAKE[i].xDir;
//         SNAKE[i].y += SNAKE[i].yDir;
//         if (SNAKE[i].x < 0) {
//             SNAKE[i].x = GAME.width - GAME.cellSize;
//         }
//         else if (SNAKE[i].x >= GAME.width) {
//             SNAKE[i].x = 0;
//         }
//         if (SNAKE[i].y < 0) {
//             SNAKE[i].y = GAME.height - GAME.cellSize;
//         }
//         else if (SNAKE[i].y >= GAME.height) {
//             SNAKE[i].y = 0;
//         }
    
//         SNAKE[i].tail.unshift({ x: SNAKE[i].x, y: SNAKE[i].y });
//         if (SNAKE[i].tail.length > SNAKE[i].maxTail) {
//             SNAKE[i].tail.pop();
//         }
    
//         drawApple();
    
//         canvasContext.fillStyle = 'black';
//         SNAKE.tail.forEach(function (cell, index) {
//             canvasContext.fillRect(cell.x, cell.y, GAME.cellSize - 1, GAME.cellSize - 1);
//             if (cell.x === APPLE.x && cell.y === APPLE.y) {
//                 SNAKE[i].maxTail += 1;
//                 SNAKE[i].score += 1;
//                 APPLE.x = randomInt(0, 25) * GAME.cellSize;
//                 APPLE.y = randomInt(0, 25) * GAME.cellSize;
//                 soundApple();
//             }
    
//             for (var z = index + 1; z < SNAKE.tail.length; z++) {
//                 if (cell.x === SNAKE.tail[z].x && cell.y === SNAKE.tail[z].y) {
//                     gameOver = true;
//                     soundFail();
//                     break;
//                 }
//             }
//         })
//     }
//     if (gameOver) {
//         drawBackground();
//         canvasContext.font = '48px Arial';
//         canvasContext.textAling = 'center';
//         canvasContext.fillStyle = 'blue';
//         //        canvasContext.fillText('You Lose\nYour Score: ' + SNAKE.score, 50, GAME.height / 2);
//         canvasContext.fillText('You lose', GAME.width / 2, GAME.height / 2);
//         canvasContext.fillText('Your score: ' + SNAKE.score, 200, 350);
//     }
// }

function onCanvasKeyDown(event) {
    if (event.key === 'ArrowLeft' && SNAKE1.xDir === 0) {
        SNAKE1.xDir = -SNAKE1.speed;
        SNAKE1.yDir = 0;
    }
    if (event.key === 'ArrowRight' && SNAKE1.xDir === 0) {
        SNAKE1.xDir = SNAKE1.speed;
        SNAKE1.yDir = 0;
    }
    if (event.key === 'ArrowUp' && SNAKE1.yDir === 0) {
        SNAKE1.yDir = -SNAKE1.speed;
        SNAKE1.xDir = 0;
    }
    if (event.key === 'ArrowDown' && SNAKE1.yDir === 0) {
        SNAKE1.yDir = SNAKE1.speed;
        SNAKE1.xDir = 0;
    }
    if (event.key === 'a' && SNAKE2.xDir === 0) {
        SNAKE2.xDir = -SNAKE2.speed;
        SNAKE2.yDir = 0;
    }
    if (event.key === 'd' && SNAKE2.xDir === 0) {
        SNAKE2.xDir = SNAKE2.speed;
        SNAKE2.yDir = 0;
    }
    if (event.key === 'w' && SNAKE2.yDir === 0) {
        SNAKE2.yDir = -SNAKE2.speed;
        SNAKE2.xDir = 0;
    }
    if (event.key === 's' && SNAKE2.yDir === 0) {
        SNAKE2.yDir = SNAKE2.speed;
        SNAKE2.xDir = 0;
    }    
    if (event.key === 'Enter' ) {
        resetGame();
    }
     console.log(event);
    if (event.key === "Escape") {
        location.href = './index.html';
    }
}

window.addEventListener('keydown', onCanvasKeyDown);

setInterval(updateSnake, 200); // интервал 2клетки в секунду

