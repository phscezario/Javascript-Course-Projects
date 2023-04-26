let order = [];
let clickedOrder = [];
let score = 0;
let time = 250;

//0 - green
//1 - red
//2 - yellow
//3 - blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Create random order
let shuffleOrder = () => {
    let currentOrder = Math.floor(Math.random() * 4);
    order[order.length] = currentOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = createColorElement(order[i]);

        setTimeout(() => {
            lightColor(elementColor, Number(i) + 1);
        });
    }
};

// highlight next color
let lightColor = (el, num) => {
    num = num * (time * 2);
    setTimeout(() => {
        el.classList.add('selected');
    }, num - time);
    setTimeout(() => {
        el.classList.remove('selected');
    }, num + (time - 100));
};

// check order clicks
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if (clickedOrder.length == order.length) {
        alert(`Score: ${score}\n You win! Starting another level`);
        nextLevel();
    }
};

// Click function
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, time);
};

// function color returned
let createColorElement = (color) => {
    if (color == 0) return green;
    else if (color == 1) return red;
    else if (color == 2) return yellow;
    else if (color == 3) return blue;
};

//Next level func
let nextLevel = () => {
    score++;
    shuffleOrder();
};

//game over func
let gameOver = () => {
    alert(`Score: ${score}\n You lose, Click on OK to restart game`);
    order = [];
    clickedOrder = [];

    playGame();
};

// Start game
let playGame = () => {
    alert('Welcome to Genius game! Starting Game');
    score = 0;

    time = Number(
        prompt(
            'Input a number to light time on, minimal recommended 100\n Bigger then 500 = Easy\n Bigger then 250 = Normal\n Less then 150 = Hard',
        ),
    );

    if (isNaN(time) || time <= 0) {
        time = 250;
        alert(`You don't entry a acceptable number, game default speed selected`);
    }

    nextLevel();
};

green.addEventListener('click', () => click(0));
red.addEventListener('click', () => click(1));
yellow.addEventListener('click', () => click(2));
blue.addEventListener('click', () => click(3));

playGame();
