var ctx = document.getElementById("canvas").getContext("2d")

var start = 0

function menu() {
	var backgroundImgSpace = new Image()
    backgroundImgSpace.src = "../img/backgroundImgSpace.jpg"
    ctx.drawImage(backgroundImgSpace, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
        
	balls[0].draw()
	paddle.draw()

    ctx.fillStyle = "white"
	ctx.font = "35px Helvetica"
    ctx.fillText("Welcome to my blockBreacker game !", 4, 60)
	ctx.font = "27px Helvetica"
    ctx.fillText("Press 'a' to start the game !", 130, 100)
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
		// ctx.beginPath()
		// ctx.fillStyle = 'silver'
  //       ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
  //       ctx.fill()
  //       ctx.closePath()

		// var ballImgMoon = new Image()
	 //    ballImgMoon.src = "../img/ballImgMoon.png"
	 //    ctx.drawImage(ballImgMoon, 0, 0, 1800, 1800, this.x - this.r/2 - 10, this.y - this.r/2 - 10, this.r * 2 + 10, this.r * 2 + 10)
		
		// var ballImgBasketball = new Image()
	 //    ballImgBasketball.src = "../img/ballImgBasketball.png"
	 //    ctx.drawImage(ballImgBasketball, 0, 0, 650, 632, this.x - this.r/2 - 10, this.y - this.r/2 - 10, this.r * 2 + 10, this.r * 2 + 10)

		var ballImgBloodMoon = new Image()
	    ballImgBloodMoon.src = "../img/ballImgBloodMoon.png"
	    ctx.drawImage(ballImgBloodMoon, 0, 0, 269, 269, this.x - this.r/2 - 10, this.y - this.r/2 - 10, this.r * 2 + 10, this.r * 2 + 10)
	}
}

// var colors = ['black', 'red', 'yellow']

function Blocks(abs, ord, hp, power) {
	this.w = 40
	this.h = 20
	this.x = abs
	this.y = ord
	this.life = hp
	this.spe = power

	this.draw = function() {
		if (this.spe === 'normal') {
			if (this.life === 1) {
				ctx.fillStyle = 'red'
				ctx.fillRect(this.x, this.y, this.w, this.h)	
			} else {
				ctx.fillStyle = 'black'
				ctx.fillRect(this.x, this.y, this.w, this.h)
			}
		} else if (this.spe === 'sizePlusP') {
			ctx.fillStyle = 'orange'
			ctx.fillRect(this.x, this.y, this.w, this.h)
		} else if (this.spe === 'sizePlusB') {
			ctx.fillStyle = 'blue'
			ctx.fillRect(this.x, this.y, this.w, this.h)
		} else if (this.spe === 'sizeMinusP') {
			ctx.fillStyle = 'pink'
			ctx.fillRect(this.x, this.y, this.w, this.h)
		} else if (this.spe === 'sizeMinusB') {
			ctx.fillStyle = 'green'
			ctx.fillRect(this.x, this.y, this.w, this.h)
		}
	}
}

blocks = []

var col = 12
var row = 10
var space = 6

function level1() {

	blocks.push(new Blocks(-100, 0))
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 6; j++) {
			blocks.push(new Blocks(91 + ((blocks[0].w + space) * i), 82 + ((blocks[0].h + space) * j), 0, 'normal'))
		}
	}
	for (i = 0; i < 11; i++) {
		blocks.push(new Blocks(45 + ((blocks[0].w + space) * i), 30 + ((blocks[0].h + space)), 1, 'normal'))
		blocks.push(new Blocks(45 + ((blocks[0].w + space) * i), 30 + ((blocks[0].h + space) * 8), 1, 'normal'))
	}
	for (i = 0; i < 6; i++) {
		blocks.push(new Blocks(-1 + ((blocks[0].w + space)), 82 + ((blocks[0].h + space) * i), 1, 'normal'))
		blocks.push(new Blocks(-1 + ((blocks[0].w + space) * 11), 82 + ((blocks[0].h + space) * i), 1 ,'normal'))
	}
	blocks.splice(8, 1)
	blocks.splice(10, 1)
	blocks.splice(42, 1)
	blocks.splice(44, 1)
	blocks.push(new Blocks(45 + ((blocks[0].w + space) * 2), 30 + ((blocks[0].h + space) * 3), 0, 'sizePlusP'))
	blocks.push(new Blocks(45 + ((blocks[0].w + space) * 8), 30 + ((blocks[0].h + space) * 3), 0, 'sizePlusB'))
	blocks.push(new Blocks(45 + ((blocks[0].w + space) * 2), 30 + ((blocks[0].h + space) * 6), 0, 'sizeMinusP'))
	blocks.push(new Blocks(45 + ((blocks[0].w + space) * 8), 30 + ((blocks[0].h + space) * 6), 0, 'sizeMinusB'))
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
		// ctx.fillStyle = 'silver'
		// ctx.fillRect(this.x, this.y, this.w, this.h)

		var paddleImg = new Image()
	    paddleImg.src = "../img/paddleImg.png"
	    ctx.drawImage(paddleImg, 0, 0, 148, 125, this.x - 35, this.y - 32, this.w + 70, this.h + 60)
	}
}

function draw() {
	var backgroundImgSpace = new Image()
    backgroundImgSpace.src = "../img/backgroundImgSpace2.jpg"
    ctx.drawImage(backgroundImgSpace, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
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
	} else if (paddle.x < 1) {
		paddle.x = 1
	} else {
		paddle.x = canvas.width - paddle.w - 1
	}
}

balls = []
balls.push(new Balls(paddle.x + paddle.w/2, paddle.y - 280))

function impact() {
	for (i = 0; i < balls.length; i++) {
		//rebonds canvas
		if (balls[i].y - balls[i].r < 0) {
			balls[i].yV *= -1
		}
		if (balls[i].x - balls[i].r < 0 || balls[i].x + balls[i].r > canvas.width) {
			balls[i].xV *= -1
		}
		//rebonds paddle
		if (balls[i].y + paddle.h + balls[i].r > paddle.y && (balls[i].x > paddle.x && balls[i].x < paddle.x + paddle.w)) {
			balls[i].yV *= -1
			//effets paddle
			if (paddle.xV > 0) {
				balls[i].xV = 6
			}
			if (paddle.xV < 0) {
				balls[i].xV = -6
			}
		}
		//rebonds blocks
		let check = 0
		for (j = 0; j < blocks.length; j++) {
			for (l = 0; l < (balls[0].r * 2); l++) {
				//rebonds haut/bas blocks
				for (k = 0; k < blocks[0].w; k++) {
					if (blocks[j]) {
						if ((balls[i].y + balls[i].r > blocks[j].y && balls[i].y - balls[i].r < blocks[j].y + blocks[j].h && check < 1) && (balls[i].x - space + l > blocks[j].x && balls[i].x - space + l < blocks[j].x + k)) {
							balls[i].yV *= -1
							check = 1
							if (blocks[j].spe === 'sizePlusP') {
								paddle.w += 100
							}
							if (blocks[j].spe === 'sizePlusB') {
								for (i = 0; i < balls.length; i++) {
									balls[i].r += 10
								}
							}
							if (blocks[j].spe === 'sizeMinusP') {
								paddle.w -= 50
							}
							if (blocks[j].spe === 'sizeMinusB') {
								for (i = 0; i < balls.length; i++) {
									balls[i].r -= 5
								}
							}
							if (blocks[j].life === 0) {
								blocks.splice(j, 1)
							} else {
								blocks[j].life -= 1
							}
						}
					}
				}
				//rebonds gauche/droite blocks
				for (k = 0; k < blocks[0].h; k++) {
					if (blocks[j]) {
						if ((balls[i].x + balls[i].r > blocks[j].x && balls[i].x - balls[i].r < blocks[j].x + blocks[j].w && check < 1) && (balls[i].y - space + l > blocks[j].y && balls[i].y - space + l < blocks[j].y + k)) {
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
			paddle.w = 100
		} else {
			console.log("GAME OVER")
			location.reload()
		}
	}
	console.log(life)
}

addEventListener("keydown", function(e) {
	if (e.keyCode === 40) {
		balls[0].yV = -5
		balls[0].xV = 1
	}
	if (e.keyCode === 38) {
		balls[0].yV = 5
		balls[0].xV = -1
	}
	if (e.keyCode === 39) {
		paddle.xV = 10
	}
	if (e.keyCode === 37) {
		paddle.xV = -10
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
		menu()
	}
}, 1000/60)


