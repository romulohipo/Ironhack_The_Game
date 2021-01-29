//Canvas Element //

let game = 0;

window.onload = () => {
    document.getElementById("start-button").onclick = () => {
    game = setInterval(startGame, 40);
    };
}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let rounds = 0;
let score = rounds;

const soundTrack = new Audio();
soundTrack.src = "./sound/ride.mp3";
soundTrack.volume = 0.5;


const badguyActions = ['down']
const badguys = [];


class Badguy {
    constructor() {
        this.width = 32;
        this.height = 48;
        this.frameX = 0;
        this.frameY = 0;
        this.x = 0;
        this.y = 0;
        // this.speed = 10;
        this.speed = (Math.random()* 1.5) + 6.5;
        this.action = badguyActions[Math.floor(Math.random() * badguyActions.length)];
        const badguySprite = new Image()
        badguySprite.src = "./imgs/bad_guy1.png"
    }
    draw() {
        drawSprite(badguySprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.frameX < 3) this.frameX++;
        else this.frameX = 0;
    }
    // Checking if Crashed //
    left() {
        return this.x;
      }
    
      right() {
        return this.x + this.width;
      }
    
      top() {
        return this.y;
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

function createBadguys() {
    if (rounds % 100 !== 0) {
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

    // Cheking if Crashed //
    left() {
        return this.x
    },
      right() {
        return this.x + this.width;
      },
    
      top() {
        return this.y;
      },
    
      bottom() {
        return this.y + this.height;
      },
    
      isCrashedWith(Badguy) {
        const condition = !(
          this.bottom() < Badguy.top() ||
          this.top() > Badguy.bottom() ||
          this.right() < Badguy.left() ||
          this.left() > Badguy.right()
        );
    
        return condition;
      }
    // metodo crashedWith(obstacle)
}
// Player Image //
const playerSprite = new Image()
playerSprite.src = "./imgs/hero.png"

// Background Image //
const background = new Image();
background.src = "./imgs/background.png"

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
badguySprite.src = "./imgs/bad_guy1.png"

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
}

function checkGameOver(Badguy){
    return player.isCrashedWith(Badguy);

    };

function startGame() {
    // MOTOR do Jogo //

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        soundTrack.play();

        rounds += 1
        //player Sprite //
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);    
        movePlayer();
        handlePlayerFrame();

        if (rounds % 50 === 0) {
            createBadguys()
        }

        badguys.forEach((el) => {
            // verifica a nao colisao (chama a player.crashedWith(el))        
            if (checkGameOver(el)){
                gameOver();
                console.log('Crashed')
            }
            el.draw()
            el.update()

        })
    }

    function gameOver (){
        clearInterval(game)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillText("Game Over!", canvas.width / 4, 200);
        ctx.fillStyle = "white";
    }