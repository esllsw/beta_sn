var GAME = {
    width: 928,
    height: 928,
    background: "black",
    cellSize: 32
}

var SNAKE = {
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

var APPLE1 = {
    x: randomInt(2, 27) * GAME.cellSize,
    y: randomInt(2, 27) * GAME.cellSize,
    color: new Image(),
    src: 'public/images/img.png',
    isImgLoad: false,
    nom: new Audio('public/sounds/nomnom.mp3'),
    audioIsOn: true,
    fail: new Audio('public/sounds/fail.mp3')
}

var APPLE2 = {
    x: randomInt(2,27) * GAME.cellSize,
    y: randomInt(2,27)* GAME.cellSize,
    color: GAME.background,
}

APPLE1.color.src = APPLE1.src;
APPLE1.color.onload = () => {
    APPLE1.isImgLoad = true;
};

function soundApple() {
    if (APPLE1.audioIsOn) {
        APPLE1.nom.play();
    }
}

function soundFail(){
    if (APPLE1.audioIsOn) {
        APPLE1.fail.play();
    }
}

var canvas = document.getElementById('canvas'); // получение объекта холста
canvas.width = GAME.width; // устанавливаем ширину холста
canvas.height = GAME.height; // устанавливаем высоту холста
var canvasContext = canvas.getContext('2d'); // получение инструмента для рисования

function drawBackground() {
    canvasContext.fillStyle = GAME.background;
    canvasContext.fillRect(0, 0, GAME.width, GAME.height);
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawScore() {
    canvasContext.font = "48px serif";
    canvasContext.fillStyle = 'red';
    canvasContext.fillText("Яблоки: " + SNAKE.score, 10, 50);
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

function drawFrame() {
    canvasContext.fillStyle = '#B1F6BD';
    canvasContext.fillRect(0,0,GAME.width,GAME.cellSize * 2);
    canvasContext.fillRect(0,0,GAME.cellSize * 2,GAME.height);
    canvasContext.fillRect(0,GAME.height - GAME.cellSize * 2, GAME.width, GAME.cellSize *2);
    canvasContext.fillRect(GAME.width - GAME.cellSize * 2, 0, GAME.cellSize * 2, GAME.height);
}


function drawApple1() {
    if (APPLE1.isImgLoad) {
        canvasContext.drawImage(APPLE1.color, APPLE1.x, APPLE1.y, GAME.cellSize, GAME.cellSize);
    }
}

function drawApple2() {
    canvasContext.fillStyle = APPLE2.color;
    canvasContext.beginPath();
    canvasContext.fillRect(APPLE2.x,APPLE2.y,GAME.cellSize - 1, GAME.cellSize - 1);
    canvasContext.closePath();
    canvasContext.fill();
}

let gameOver1 = false;
let gameOver2 = false;


function resetGame() {
    // Сбрасываем все параметры игры
    SNAKE.x = 320;
    SNAKE.y = 320;
    SNAKE.xDir = GAME.cellSize;
    SNAKE.yDir = 0;
    SNAKE.tail = [];
    SNAKE.maxTail = 1;
    SNAKE.score = 0;

    APPLE1.x = randomInt(2, 27) * GAME.cellSize;
    APPLE1.y = randomInt(2, 27) * GAME.cellSize;
    APPLE2.x = randomInt(2, 27) * GAME.cellSize;
    APPLE2.y = randomInt(2, 27) * GAME.cellSize;
    gameOver1 = false;
    gameOver2 = false;

    updateSnake()
}

function updateSnake() {

    if (gameOver1 && gameOver2) 
        return;
    canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawFrame();
    // drawGrid();
    SNAKE.x += SNAKE.xDir;
    SNAKE.y += SNAKE.yDir;
    if (SNAKE.x < GAME.cellSize * 2) {
        SNAKE.x = GAME.width - GAME.cellSize * 3;
    }
    else if (SNAKE.x >= GAME.width - GAME.cellSize * 2) {
        SNAKE.x = GAME.cellSize * 2;
    }
    if (SNAKE.y < GAME.cellSize * 2) {
        SNAKE.y = GAME.height - GAME.cellSize * 3;
    }
    else if (SNAKE.y >= GAME.height - GAME.cellSize * 2) {
        SNAKE.y = GAME.cellSize * 2;
    }

    SNAKE.tail.unshift({ x: SNAKE.x, y: SNAKE.y });
    if (SNAKE.tail.length > SNAKE.maxTail) {
        SNAKE.tail.pop();
    }

    drawApple1();
    drawApple2();
    console.log(APPLE2.x,APPLE2.y)

    canvasContext.fillStyle = 'green';
    SNAKE.tail.forEach(function (cell, index) {
        canvasContext.fillRect(cell.x, cell.y, GAME.cellSize - 1, GAME.cellSize - 1);
        if (cell.x === APPLE1.x && cell.y === APPLE1.y) {
            SNAKE.maxTail++;
            SNAKE.score += 1;
            APPLE1.x = randomInt(2, 27) * GAME.cellSize;
            APPLE1.y = randomInt(2, 27) * GAME.cellSize;
            soundApple()
        }

        if (cell.x === APPLE2.x && cell.y === APPLE2.y) {
            gameOver2 = true;
            soundFail();
        }

        for (var i = index + 1; i < SNAKE.tail.length; i++) {
            if (cell.x === SNAKE.tail[i].x && cell.y === SNAKE.tail[i].y) {
                gameOver1 = true;
                soundFail()
                break;
            }
        }
    })
    drawScore();
    if (SNAKE.tail.length === GAME.x / GAME.cellSize * 2) {
        drawBackground();
        canvasContext.font = '48px Arial';
        canvasContext.textAling = 'center';
        canvasContext.fillStyle = 'whire';
        canvasContext.fillText("You win!", GAME.width / 2, GAME.height / 2); d
    }
    if (gameOver2) {
        drawBackground();
        canvasContext.font = '48px Arial';
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Вы наступили на подлый гриб!', 55, 370);
        canvasContext.fillText('Ваш результат: ' + SNAKE.score, 200, 420);
    }
    if (gameOver1) {
        drawBackground();
        canvasContext.font = '48px Arial';
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Вы проиграли!', 220, 370);
        canvasContext.fillText('Ваш результат: ' + SNAKE.score, 200, 420);
    }
}
var isEscape = false;

function onCanvasKeyDown(event) {
    if (event.key === 'ArrowLeft' && SNAKE.xDir === 0) {
        SNAKE.xDir = -SNAKE.speed;
        SNAKE.yDir = 0;
    }
    if (event.key === 'ArrowRight' && SNAKE.xDir === 0) {
        SNAKE.xDir = SNAKE.speed;
        SNAKE.yDir = 0;
    }
    if (event.key === 'ArrowUp' && SNAKE.yDir === 0) {
        SNAKE.yDir = -SNAKE.speed;
        SNAKE.xDir = 0;
    }
    if (event.key === 'ArrowDown' && SNAKE.yDir === 0) {
        SNAKE.yDir = SNAKE.speed;
        SNAKE.xDir = 0;
    }
    if (event.key === 'Enter') {
        resetGame();
    }
    // console.log(event);
    if (event.key === "Escape") {
        window.location.href = 'index.html';
    }
}

updateSnake();

window.addEventListener('keydown', onCanvasKeyDown);


setInterval(updateSnake, 100); // интервал 2клетки в секунду