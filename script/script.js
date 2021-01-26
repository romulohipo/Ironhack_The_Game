//Canvas Element //
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

//Key Listner //
const keys = [];

// Player Info //
const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    framex: 0,
    framey: 0,
    speed: 10,
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
    drawSprite(playerSprite, 0, 0, player.width, player.height, 200, 200, player.width, player.height);
    requestAnimationFrame(animate);
}

animate();

