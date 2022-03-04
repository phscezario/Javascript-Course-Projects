(function(){
    const startMenu = document.querySelector('#start');
    const gameWindow = document.querySelector('#background');
    const viewSize = parseInt(window.getComputedStyle(gameWindow).getPropertyValue('width'));

    const shotSound = document.querySelector('#shot-sound');
    const gameplaySound = document.querySelector('#gameplay-sound');
    const explosionSound = document.querySelector('#explosion-sound');
    const gameoverSound = document.querySelector('#gameover-sound');
    const lostSound = document.querySelector('#lost-sound');
    const saveSound = document.querySelector('#save-sound');

    shotSound.volume = 0.05;
    gameplaySound.volume = 0.3;
    explosionSound.volume = 0.3;
    gameoverSound.volume = 1;
    lostSound.volume = 0.3;
    saveSound.volume = 0.3;

    let scorePoint = 0;
    let lostFriends = 0;
    let savedFriends = 0;
    let playerLife = 150;

    let game = {
        'pressed': []
    };

    let keys = {
        W: 'KeyW',
        S: 'KeyS',
        A: 'KeyA',
        D: 'KeyD',
        ArrowUp: 'ArrowUp',
        ArrowDown: 'ArrowDown',
        ArrowLeft: 'ArrowLeft',
        ArrowRight: 'ArrowRight',
        Space: 'Space',
        Click: 'click',
    };

    let enemy1Speed = -5;
    let enemy2Speed = -3;
    let enemy1Spawn = parseInt((Math.random() * 340) + 10);
    
    function start() {   
        startMenu.style.display = 'none';   

        let gameTimer = setInterval(loop, 30);

        gameWindow.innerHTML += '<div id="player" class="playerIdle" can-attack="true"></div>';
        gameWindow.innerHTML += '<div id="enemy1" class="enemy1Idle" data-y-mobility="true" can-attack="true"></div>';
        gameWindow.innerHTML += '<div id="enemy2" class="enemy2Idle"></div>';
        gameWindow.innerHTML += '<div id="friend" class="friendIdle"></div>';    
        gameWindow.innerHTML += '<div id="score"></div>';    
        gameWindow.innerHTML += '<div id="friend-score"></div>';    
        gameWindow.innerHTML += '<div id="life-bar-bg"></div>';    
        gameWindow.innerHTML += '<div id="life-bar"></div>';    
        
        const player = document.querySelector('#player');
        const enemy1 = document.querySelector('#enemy1');
        const enemy2 = document.querySelector('#enemy2');
        const friend = document.querySelector('#friend');
        const scorePainel = document.querySelector('#score');
        const friendsPainel = document.querySelector('#friend-score');
        const lifeBar = document.querySelector('#life-bar');

        function loop() {
            if (playerLife > 0 ) {
                moveBackground();
                movePlayer(player, [enemy1, enemy2]);
                moveAI(enemy1, enemy1Speed);
                moveAI(enemy2, enemy2Speed);
                moveAI(friend, 1);
                verifyColliders(player, [enemy1, enemy2, friend]);
                verifyColliders(friend, [enemy1, enemy2]);
                scorePainel.innerHTML = scorePoint;
                friendsPainel.innerHTML = `Saved: ${savedFriends} | Lost: ${lostFriends}`;
                lifeBar.style.width = `${playerLife < 0 ? playerLife = 0 : playerLife }px`;
                gameplaySound.play();
            }
            else {
                gameoverSound.play();    
                gameOver(gameTimer);         
            }         
        }        
    }

    function moveBackground() {
        left = window.getComputedStyle(gameWindow).getPropertyValue('background-position');
        let number = left.split(' ');
        gameWindow.style.backgroundPosition = `${parseInt(number[0]) - 1}px`;
    }

    function movePlayer(e, colliders = null) {
        let eSize = parseInt(window.getComputedStyle(e).getPropertyValue('width'));
        let playerPositionY =  parseInt(window.getComputedStyle(e).getPropertyValue('top'));
        let playerPositionX =  parseInt(window.getComputedStyle(e).getPropertyValue('left'));
        let canAttack = e.getAttribute('can-attack');

        if ((game.pressed[keys.W] || game.pressed[keys.ArrowUp]) && playerPositionY >= 10) {
            e.style.top = `${playerPositionY - 10}px`;
        }
        else if ((game.pressed[keys.S] || game.pressed[keys.ArrowDown]) && playerPositionY <= 430) {
            e.style.top = `${playerPositionY + 10}px`;
        }

        if ((game.pressed[keys.A] || game.pressed[keys.ArrowLeft]) && playerPositionX >= 10) {
            e.style.left = `${playerPositionX - 10}px`;
        }
        else if ((game.pressed[keys.D] || game.pressed[keys.ArrowRight]) && playerPositionY <= (viewSize - eSize)) {
            e.style.left = `${playerPositionX + 10}px`;
        }

        if (canAttack === 'true' && (game.pressed[keys.Space] || game.pressed[keys.Click] )) {           
           shootAttack(e, 'bullet', 30, (playerPositionX + 170), (playerPositionY + 50), colliders);
        }
    }

    async function moveAI(e, speed, whoShoot = null, timer = null) {
        let eSize = parseInt(window.getComputedStyle(e).getPropertyValue('width'));
        let positionX =  parseInt(window.getComputedStyle(e).getPropertyValue('left'));

        e.style.left = `${positionX + speed}px`;
        
        if (e.getAttribute('data-y-mobility') === 'true') e.style.top = `${enemy1Spawn}px`;

        if (e.getAttribute('data-destroy') === 'true') {
            if (speed < 0) {
                positionX = -10000;
                e.style.left = '-10000px';
            } 
            else {
                positionX = 10000;
                e.style.left = '10000px';
            };
            setTimeout(() => {
                e.setAttribute('data-destroy', 'false');
            }, 1000);
            
        }
        else {
            if (positionX <= 0 && speed < 0) {
                if (e.getAttribute('data-y-mobility') === 'true') {
                    enemy1Spawn = parseInt((Math.random() * 340) + 10);
                    e.style.top = `${enemy1Spawn}px`;
                }
                
                if (whoShoot) {
                    gameWindow.removeChild(e);
                    whoShoot.setAttribute('can-attack', 'true');
                    window.clearInterval(timer);
                    timer = null;
                }
                else {
                    e.style.left = ``;
                    e.style.right = `0`;
                }   
                
                
            } 
            else if (positionX >= (viewSize - eSize) && speed > 0) {
                if (e.getAttribute('data-y-mobility') === 'true') {
                    enemy1Spawn = parseInt((Math.random() * 340) + 10);
                    e.style.top = `${enemy1Spawn}px`;
                }
                
                if (whoShoot) {
                    gameWindow.removeChild(e);
                    whoShoot.setAttribute('can-attack', 'true');
                    window.clearInterval(timer);
                    timer = null;
                }
                else {
                    e.style.left = `0`;
                    e.style.right = ``;
                }           
            }
        }

       
    }

    function shootAttack(whoShoot, type, speed, posX, posY, colliders) {
        shotSound.play();
        let bullet = document.createElement('div');
        bullet.classList.add(type);
        bullet.style.left = `${posX}px`;
        bullet.style.top = `${posY}px`;
        gameWindow.append(bullet);
        whoShoot.setAttribute('can-attack', 'false');
              
        let bulletMove = window.setInterval(moveBullet, 30);
            
        function moveBullet() {
            moveAI(bullet, speed, whoShoot, bulletMove);
            verifyColliders(bullet, colliders, whoShoot, bulletMove);
        }
     
    }

    function verifyColliders(el, colliders,  whoShoot = null, timer = null) {
        colliders.forEach( e => {
            let elementCollider = {
                x: el.getBoundingClientRect().x,
                y: el.getBoundingClientRect().y,
                w: el.offsetWidth - 20,
                h: el.offsetHeight - 20,
            }
    
            if (e) {
                let eCollider = {
                    x: e.getBoundingClientRect().x,
                    y: e.getBoundingClientRect().y,
                    w: e.offsetWidth - 20,
                    h: e.offsetHeight - 20,
                }
    
                if ((elementCollider.x < eCollider.x + eCollider.w &&
                    elementCollider.x + elementCollider.w > eCollider.x &&
                    elementCollider.y < eCollider.y + eCollider.h &&
                    elementCollider.h + elementCollider.y > eCollider.y) &&
                    (el.getAttribute('data-destroy') !== 'true' && e.getAttribute('data-destroy') !== 'true')) {
                    if (whoShoot && timer) {
                        gameWindow.removeChild(el);
                        whoShoot.setAttribute('can-attack', 'true');
                        window.clearInterval(timer);
                        timer = null;
                    }

                    if (el.getAttribute('id') === 'friend' && e.getAttribute('id') !== 'player') {
                        createExplosion(el, 'friend-dead');    
                        el.setAttribute('data-destroy', 'true');    
                        lostFriends += 1;         
                        lostSound.play();               
                    }
                    else if (e.getAttribute('id') === 'friend' && el.getAttribute('id') !== 'player') {
                        createExplosion(e, 'friend-dead');
                        e.setAttribute('data-destroy', 'true');
                        lostFriends += 1;
                        lostSound.play();
                    }
                    else if (el.getAttribute('id') == 'player' && e.getAttribute('id') == 'friend') {
                        savedFriends += 1;
                        e.setAttribute('data-destroy', 'true');
                        saveSound.play();
                    }
                    else {
                        if(el.getAttribute('id') === 'player') {
                            el.classList.add('playerGetHit');
                            setTimeout(() => {
                                el.classList.remove('playerGetHit'); 
                                playerLife -= 40;
                            }, 600);
                        } else {
                            if (e.getAttribute('id') === 'enemy1') {
                                scorePoint += 200;
                                enemy1Speed -= 0.3;
                            }
                            if (e.getAttribute('id') === 'enemy2') {
                                scorePoint += 100;
                                enemy2Speed -= 0.3;
                            } 
                        }

                        createExplosion(e, 'explosion');
                        e.setAttribute('data-destroy', 'true');
                    }

                }  
            }
            
        });        
    }
    
    async function createExplosion(e, type, time = 200) {
        explosionSound.play();
        let explosion = document.createElement('div');
        explosion.setAttribute('class', type)
        explosion.style.left = parseInt(window.getComputedStyle(e).getPropertyValue('left')) + 'px';
        explosion.style.top = parseInt(window.getComputedStyle(e).getPropertyValue('top')) + 'px';
        gameWindow.append(explosion);
        

        setTimeout(() => {
            gameWindow.removeChild(explosion);
        }, time);
    }

    async function gameOver(loop = null) {
        window.clearInterval(loop);
        loop = null;
        gameplaySound.pause();
        
        gameWindow.innerHTML = `<div id="end">
                                    <h1>Game Over</h1>
                                    <p>You score: ${scorePoint}</p>
                                    <p>You save: ${savedFriends} and Lost: ${lostFriends}</p>
                                    <h3>Press to play again</h3>
                                </div>`;

        const endWindow = document.querySelector('#end');

        endWindow.addEventListener('click', () => {
            restartGame()
        });
        
    }

    function restartGame() {
        gameWindow.innerHTML = '';
        scorePoint = 0;
        lostFriends = 0;
        savedFriends = 0;
        playerLife = 150;
        start();
    }

    startMenu.addEventListener('click', () => start());

    document.addEventListener('keydown', e => {
        game.pressed[e.code] = true;
    });

    document.addEventListener('keyup', e => {
        game.pressed[e.code] = false;
    });
    
    document.addEventListener('mousedown', e => {
        game.pressed['click'] = true;
    });

    document.addEventListener('mouseup', e => {
        game.pressed['click'] = false;
    }); 

})();
