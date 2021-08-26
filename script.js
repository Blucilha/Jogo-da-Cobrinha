let canvas = document.getElementById('campo');
let ctx = canvas.getContext('2d');
let box = 32;
let direction = 'right';

let snakeAtributos = [];
snakeAtributos[0] = {
    x: box * 8,
    y: box * 8,
}

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

function atualiza(event) {
    switch(event.keyCode) {
        case 37:
            if (direction !== 'right') direction = 'left';
            break;
        case 38:
            if (direction !== 'down') direction = 'up';
            break;
        case 39:
            if (direction !== 'left') direction = 'right';
            break;
        case 40:
            if (direction !== 'up') direction = 'down';
            break;
        default:
            break;
    }
}

document.addEventListener('keydown', atualiza);

function criaBackgound() {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, 15 * box, 15 * box);
}

function snake() {
    for (let index = 0; index < snakeAtributos.length; index ++) {
        ctx.fillStyle = "rgb(243, 243, 243)";
        ctx.fillRect(snakeAtributos[index].x, snakeAtributos[index].y, box, box);
    }
}

function food() {
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x, comida.y, box, box);
}

function iniciarJogo() {

    if (snakeAtributos[0].x > 15 * box && direction == 'right') snakeAtributos[0].x = 0;
    if (snakeAtributos[0].y > 15 * box && direction == 'down') snakeAtributos[0].y = 0;
    if (snakeAtributos[0].x < 0 && direction == 'left') snakeAtributos[0].x = 15 * box;
    if (snakeAtributos[0].y < 0 && direction == 'up') snakeAtributos[0].y = 15 * box;

    for(i = 1; i < snakeAtributos.length; i++){
        if(snakeAtributos[0].x == snakeAtributos[i].x && snakeAtributos[0].y == snakeAtributos[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criaBackgound();
    snake();
    food();

    let snakeAtributosX = snakeAtributos[0].x;
    let snakeAtributosY = snakeAtributos[0].y;

    switch(direction) {
        case 'right':
            snakeAtributosX += box;
            break;
        case 'left':
            snakeAtributosX -= box;
            break;
        case 'up':
            snakeAtributosY -= box;
            break;
        case 'down':
            snakeAtributosY += box;
            break;
        default:
            break;
    }

    if(snakeAtributosX !== comida.x || snakeAtributosY != comida.y){
        snakeAtributos.pop();
    } else {
        comida.x = Math.floor(Math.random() * 16) * box;
        comida.y = Math.floor(Math.random() * 16) * box;
    }

    let newHead = {
        x: snakeAtributosX,
        y: snakeAtributosY,
    };

    snakeAtributos.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
