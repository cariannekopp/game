const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

const gameMap = new Image()
gameMap.src = './assets/pokemonStyleGameMap.png'

const playerImage = new Image()
playerImage.src = './assets/playerDown.png'

const playerStartXPosition = (canvas.width / 2) + 10;
const playerStartYPosition = (canvas.height / 2) - 10;

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position;
        this.image = image;
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -2335,
        y: -410
    },
    image: gameMap
});

const keys = {
    w: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    a: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }

}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw();
    //context.drawImage(gameMap, mapStartXPosition, mapStartYPosition)
    context.drawImage(
        playerImage, //image
        0, //x position to start clipping
        0, //y position to start clipping
        playerImage.width / 4, //width of clipped image
        playerImage.height, //heigh of clipped image
        playerStartXPosition, //image x position on map
        playerStartYPosition, //image y position on map
        playerImage.width / 4, //width of image
        playerImage.height //height of image
    )
    if(keys.w.pressed) {background.position.y += 3}
    if(keys.ArrowUp.pressed) {background.position.y += 3}
    if(keys.s.pressed) {background.position.y -= 3}
    if(keys.ArrowDown.pressed) {background.position.y -= 3}
    if(keys.a.pressed) {background.position.x += 3}
    if(keys.ArrowLeft.pressed) {background.position.x += 3}
    if(keys.d.pressed) {background.position.x -= 3}
    if(keys.ArrowRight.pressed) {background.position.x -= 3}
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            break;
        case 'w':
            keys.w.pressed = true;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        default:
            console.log('not a functional key')
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        default:
            console.log('not a functional key')
    }
})
