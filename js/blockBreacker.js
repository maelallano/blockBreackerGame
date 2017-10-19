var ctx = document.getElementById("canvas").getContext("2d")

var start = 0

function menu() {
	ctx.font = "35px Helvetica"
    ctx.fillText("Welcome to my blockBreacker game !", 4, 60)
	ctx.font = "27px Helvetica"
    ctx.fillText("Press 'a' to start the game !", 130, 240)
	ctx.font = "27px Helvetica"

	addEventListener('keydown', function(e) {
		if (e.keyCode === 65) {
			start = 1
		}
	})
}



function Balls(abs, ord) {
	this.r = 10
	this.x = abs
	this.y = ord
	this.xV = 0
	this.yV = 0

	this.move = function() {
		this.x += this.xV
		this.y += this.yV
	}

	this.draw = function() {
		ctx.beginPath()
		ctx.fillStyle = 'black'
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
	}
}

function Blocks(abs, ord, color=0) {
	this.w = 40
	this.h = 20
	this.x = abs
	this.y = ord
	this.wesh = color

	this.draw = function() {
		if (this.wesh === 1) {
			ctx.fillStyle = 'red'
			ctx.fillRect(this.x, this.y, this.w, this.h)
		} else {
			ctx.fillStyle = 'black'
			ctx.fillRect(this.x, this.y, this.w, this.h)
		}
	}
}

blocks = []

var col = 12
var row = 10
var space = 10

function level1() {
	blocks.push(new Blocks(-100, 0))
	for (i = 0; i < 10; i++) {
		for (j = 0; j < 8; j++) {
			blocks.push(new Blocks(45 + ((blocks[0].w + space) * i), 30 + ((blocks[0].h + space) * j)))
		}
	}
	for (j = 0; j < 10; j++) {
		blocks.push(new Blocks(45 + ((blocks[0].w + space) * j), 30 + ((blocks[0].h + space) * 8)))
		blocks.push(new Blocks(45 + ((blocks[0].w + space) * j), 30 + ((blocks[0].h + space) * 8), 1))
	}
}

level1()


var paddle = {
	w: 100,
	h: 10,
	x: canvas.width/2 - 100/2,
	y: canvas.height - 30,
	xV: 0,

	move: function() {
		this.x += this.xV
	},

	draw: function() {
		ctx.fillStyle = 'black'
		ctx.fillRect(this.x, this.y, this.w, this.h)
	}
}

function draw() {
	for (i = 0; i < balls.length; i++) {
		balls[i].draw()
	}
	for (i = 0; i < blocks.length; i++) {
		blocks[i].draw()
	}

	paddle.draw()
}

function move() {
	for (i = 0; i < balls.length; i++) {
		balls[0].move()
	}
	if (paddle.x + paddle.w < canvas.width && paddle.x > 0) {
		paddle.move()
	} else if (paddle.x < 0) {
		paddle.x = 1
	} else {
		paddle.x = canvas.width - paddle.w - 1
	}
}

balls = []
balls.push(new Balls(paddle.x + paddle.w/2, paddle.y - 260))

function impact() {
	for (i = 0; i < balls.length; i++) {
		//rebonds canvas
		if (balls[i].y - 10 < 0) {
			balls[i].yV *= -1
		}
		if (balls[i].x - 10 < 0 || balls[i].x + 10 > canvas.width) {
			balls[i].xV *= -1
		}
		//rebonds paddle
		if (balls[i].y + paddle.h > paddle.y && (balls[i].x > paddle.x && balls[i].x < paddle.x + paddle.w)) {
			balls[i].yV *= -1
			//effets paddle
			if (paddle.xV > 0) {
				balls[i].xV = 10
			}
			if (paddle.xV < 0) {
				balls[i].xV = -10
			}
		}
		//rebonds blocks
		let check = 0
		for (j = 0; j < blocks.length; j++) {
			for (l = 0; l < (balls[0].r * 2); l++) {
				//rebonds haut/bas blocks
				for (k = 0; k < blocks[0].w; k++) {
					if (blocks[j]) {
						if ((balls[i].y + 10 > blocks[j].y && balls[i].y - 10 < blocks[j].y + blocks[j].h && check < 1) && (balls[i].x - space + l > blocks[j].x && balls[i].x - space + l < blocks[j].x + k)) {
							balls[i].yV *= -1
							check = 1
							blocks.splice(j, 1)
						}
					}
				}
				//rebonds gauche/droite blocks
				for (k = 0; k < blocks[0].h; k++) {
					if (blocks[j]) {
						if ((balls[i].x + 10 > blocks[j].x && balls[i].x - 10 < blocks[j].x + blocks[j].w && check < 1) && (balls[i].y - space + l > blocks[j].y && balls[i].y - space + l < blocks[j].y + k)) {
							balls[i].xV *= -1
							check = 1
							blocks.splice(j, 1)
						}
					}
				}
			}
		}
	}
}

var life = 3

function gameOver() {
	for (i = 0; i < balls.length; i++) {
		if (balls[i].y > paddle.y) {
			balls.splice(i, 1)
		}
	}
	if (!balls[0]) {
		life--
		if (life) {
			balls.push(new Balls(paddle.x + paddle.w/2, paddle.y - 260))
		} else {
			console.log("GAME OVER")
			location.reload()
		}
	}
	console.log(life)
}

addEventListener("keydown", function(e) {
	if (e.keyCode === 40) {
		balls[0].yV = -10
		balls[0].xV = 2
	}
	if (e.keyCode === 38) {
		balls[0].yV = 10
		balls[0].xV = -2
	}
	if (e.keyCode === 39) {
		paddle.xV = 20
	}
	if (e.keyCode === 37) {
		paddle.xV = -20
	}
})

addEventListener("keyup", function(e) {
	if (e.keyCode === 39 || e.keyCode === 37) {
		paddle.xV = 0
	}
})

setInterval(function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	if (start) {
		move()
		draw()
		impact()
		gameOver()
	} else {
		balls[0].draw()
		paddle.draw()
		menu()
	}
}, 1000/30)


