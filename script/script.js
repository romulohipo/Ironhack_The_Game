//Canvas Element //
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

//Key Listner //
const keys = [];

// Player Info //
const player = {
    x: 400,
    y: 200,
    width: 32,
    height: 48,
    framex: 0,
    framey: 0,
    speed: 7,
    moving: false
}
// Player Image //
const playerSprite = new Image()
playerSprite.src = "../imgs/hero.png"

// Background Image //
const background = new Image();
background.src = "../imgs/background.png"

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// Background Clear //
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //player sprite //
    drawSprite(playerSprite, player.width * player.framex, player.height * player.framey, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();
    requestAnimationFrame(animate);
}

animate();

//Tracking of pressed keys
window.addEventListener("keydown", function(e){
    keys[e.keyCode] =  true;
    console.log(keys);
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

// Moving Player //

        // Move Up//
function movePlayer(){
    if( keys[38] && player.y  > 100){
        player.y -= player.speed;
        player.framey = 3;
    }
        // Move Left
    if( keys[37] && player.x > 0){
        player.x -= player.speed;
        player.framey = 1;
    }
        // Move Down
    if( keys[40] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.framey = 0;
    }
        // Move Right
    if( keys[39] && player.x < canvas.width - player.width){
        player.x += player.speed;
        player.framey = 2;
    }
}

