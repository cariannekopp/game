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

//const mapStartXPosition = -2335;
//const mapStartYPosition = -410;
const playerStartXPosition = (canvas.width / 2) + 10;
const playerStartYPosition = (canvas.height / 2) - 10;

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position;
        this.image = image;
    }
    draw() {
        context.drawImage(this.image, -2335, -410)
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
