//Canvas Element //
window.onload = () => {
    document.getElementById("start-button").onclick = () => {
      startGame();
    };
}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let rounds = 0;
let score = rounds;

const soundTrack = new Audio();
soundTrack.src = "../sound/ride.mp3";
soundTrack.volume = 0.5;


const badguyActions = ['down']
// const badguyActions = ['up', 'down', 'right', 'left ',]
const badguys = [];


class Badguy {
    constructor() {
        this.width = 32;
        this.height = 48;
        this.frameX = 0;
        this.frameY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        // this.speed = (Math.random()* 1.5) + 3.5;
        this.action = badguyActions[Math.floor(Math.random() * badguyActions.length)];
        const badguySprite = new Image()
        badguySprite.src = "../imgs/bad_guy1.png"
    }
    draw() {
        drawSprite(badguySprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.frameX < 3) this.frameX++;
        else this.frameX = 0;
    }

    bottom() {
        return this.y + this.height;
      }

    update() {
        //Badguy Movedown
        if (this.action === 'down') {
            if (this.y > canvas.height - this.height) {
                this.y = 0 - this.height;
                this.x = Math.random() * (canvas.width - this.width);
                
            }
            else {
                this.y += this.speed;
            }
            //Badguy Move up
        } else if (this.action === 'up') {
            if (this.y <= (0)) {
                this.y = canvas.height - this.width;
                this.x = Math.random() * canvas.width;
                
            } else {
                this.y -= this.speed;
            }
        }
        //Badguy Move Right
        else if (this.action === 'right') {
            if (this.x > (canvas.width)) {
                this.y = canvas.height - this.height;
                this.x = Math.random() * canvas.width;
                
            } else {
                this.x += this.speed;
            }
        }
        //Badguy Move Left
        else if (this.action === 'left') {
            if (this.x < (0)) {
                this.y = canvas.height - this.height;
                this.x = Math.random() * canvas.width;
                
            } else {
                this.x -= this.speed;
            }
        }
    }
}

badguys.push(new Badguy());

function createBadguys(){
    if (rounds % 100 !== 0){
        badguys.push(new Badguy());
    }
}


//Key Listner //
const keys = [];

// Player Info //
const player = {
    x: 400,
    y: 200,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 10,
    moving: false,

    top() {
        return y;
      },
    // metodos top() bottom() right() e left() p verificar limites do objeto

    isCrashedWith(obstacle) {
        const condition = !(
          top() > badguy.bottom()
        );
    
        return condition;
        console.log('Crash');
      }
      // metodo crashedWith(obstacle)
}
// Player Image //
const playerSprite = new Image()
playerSprite.src = "../imgs/hero.png"

// Background Image //
const background = new Image();
background.src = "../imgs/background.png"

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

//Tracking of pressed keys
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
    player.moving = false;
});

// Moving Player //

// Move Up//
function movePlayer() {
    if (keys[38] && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
    }
    // Move Left
    if (keys[37] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
    }
    // Move Down
    if (keys[40] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
    }
    // Move Right
    if (keys[39] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2;
    }
}
// Controlling player animation Frame //
function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}

const badguySprite = new Image()
badguySprite.src = "../imgs/bad_guy1.png"

const badguy = {
    x: 500,
    y: 200,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false
}

// ANTIGO //
function handleBadguyFrame() {
    badguy.frameX = 0;

    // // moving //
    // if (badguy.y < canvas.height + badguy.height) badguy.y += badguy.speed;
    // else badguy.y = 0 - badguy.height;
}
function startGame(){
// MOTOR do Jogo //
setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    soundTrack.play();
    
    rounds += 1
    //player Sprite //
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    // drawSprite(badguySprite, badguy.width * badguy.frameX, badguy.height * badguy.frameY, badguy.width, badguy.height, badguy.x, badguy.y, badguy.width, badguy.height);

    movePlayer();

    //Badguy Sprite//
    // drawSprite(badguySprite, badguy.width * badguy.frameX, badguy.height * badguy.frameY, badguy.width, badguy.height, badguy.x, badguy.y, badguy.width, badguy.height);
    handleBadguyFrame()
    handlePlayerFrame();
    
    if( rounds % 50 === 0){
        createBadguys()
    }

    badguys.forEach((el) => {
        // verifica a nao colisao (chama a player.crashedWith(el))
        el.draw()
        el.update()
    
    } )
}, 40)
}