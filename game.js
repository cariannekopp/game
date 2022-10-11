const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;
const MOVE_FORCE = 100;
const CREEP_SPEED = 120;
let score = 0;

// initialize context
kaboom();

//set resource url
loadRoot('https://raw.githubusercontent.com/cariannekopp/game/main/assets/')
// load assets
loadSprite("shrek", "shrekLookRight.png?raw=true");
loadSprite("ground", "ground2.png?raw=true");
loadSprite("coin", "coin.png?raw=true");
loadSprite("background", "backdrop.gif?raw=true")
loadSprite("shrekFace", "shrekface.png?raw=true")
loadSprite("villager", "villager.png?raw=true")
loadSprite("elmoFire", "elmoFire.gif?raw=true")

loadSound("gtfoMySwamp", "swamp-remix.mp3?raw=true")
loadSound("gameOver", "smash-mouth-all-star.mp3?raw=true")



scene("game", () => {
    // define gravity
    gravity(2400);
	//set up layers
	layers([
    "bg",
    "game",
    "ui",
], "game")
    // add a game object to screen
    const player = add([
        // list of components
        sprite("shrek"),
        pos(40, 100),
        area(),
        body(),
		health(5),
		//outview({onExitView: (go("lose", score))}),
		"player",
    ]);

	//backdrop
	const backdrop = add([
		sprite("background"),
		scale(1.75),
		pos(0, 0),
		layer("bg"),
	])
    // floor
	function setGroundWidth() {
		let screenWidth = width();
		const groundWidth = 193;
		let groundNeeded = Math.ceil(screenWidth / groundWidth)
		let groundCoordinates = []
		for(i=0; i < groundNeeded; i++) {
			groundCoordinates.push(i*groundWidth)
		}
		return groundCoordinates
	}

	function createGround() {
		let groundCoordinates = setGroundWidth()
		for(i=0; i < groundCoordinates.length; i++) {
		  add([
		    sprite("ground"),
            pos(groundCoordinates[i], height()),
            origin("bot"),
            area(),
            solid(),
          ]);
		}
	}

	createGround()

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    // jump when user press space
    onKeyPress("space", jump);

	onKeyDown("up", () => {
		jump();
	})

	onKeyDown("right", () => {
		player.move(SPEED, 0)
	})

	onKeyDown("left", () => {
		player.move(-SPEED, 0)
	})

	player.onUpdate(() => {
    if (player.pos.x >= width() || player.pos.x < -1) {
        destroy(player)
        go("lose", score)
    }
})

	function spawnCoin() {
		add([
			sprite("coin"),
			scale(2),
			area(),
			pos(880, rand(200, 250)),
			origin('botleft'),
			move(LEFT, SPEED),
			"coin",
		])
		wait(rand(0.5, 1.5), spawnCoin);
	}

spawnCoin()

    player.onCollide("coin", (coin) => {
		destroy(coin);
        burp();
        addKaboom(player.pos);
		updateScore();
    });
	
   player.onCollide("enemy", () => {
     go("lose", score)
   })

    const scoreLabel = add([
        text(score),
        pos(24, 24),
    ]);

	function updateScore() {
		score++
		scoreLabel.text = score;
		addCraziness(score);
		return score;
	}

	function addCraziness(score) {
		console.log(score)
		switch(score) {
			case 5:
				shrekCreep();
				break;
			case 12:
				villagerAttack();
				break;
			default:
				break;
		}
	}
});

function shrekCreep() {
	add([
		sprite("shrekFace"),
		layer("bg"),
		area(),
		pos((width()/2), 500),
		origin('center'),
		//move(player.pos, CREEP_SPEED),
		move(UP, CREEP_SPEED),
		cleanup(),
	])
}


function villagerAttack() {
	let enemyMusic = play("gtfoMySwamp")
	const enemy = 
	add([
		sprite("villager"),
		area(),
		pos(640, 100),
		body(),
		shake(),
		state("idle", ["idle", "attack", "move"]),
		"enemy",
	])
}


scene("lose", (score) => {
	let gameOverSound = play("gameOver")
	gameOverSound.loop();
	add([
		sprite("elmoFire"),
		layer("bg"),
		scale(1.75),
	])
	
    add([
        sprite("shrek"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
		layer("game"),
    ]);

    // display score
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        origin("center"),
		layer("game")
    ]);

    // go back to game with space is pressed
	onKeyPress("space", () => gameOverSound.pause())
    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));

});

go("game");