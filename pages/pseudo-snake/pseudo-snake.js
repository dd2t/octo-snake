const canvasParent = document.querySelector('div#display')
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 512
canvas.height = 480
canvasParent.appendChild(canvas)

var fundo = new Image()
fundo.src = "../../images/pseudo-snake/fundo.png"
var bau = new Image()
bau.src = "../../images/pseudo-snake/caixa.png"
var monstro = new Image()
monstro.src = "../../images/pseudo-snake/monster.png"
var heroi = new Image()
heroi.src = "../../images/pseudo-snake/hero.png"

var carregadas = 0
var total = 4
fundo.onload = carregando
bau.onload = carregando
monstro.onload = carregando
heroi.onload = carregando

function carregando(){
	carregadas++
	if(carregadas == total){
		reset()
		main()
	}
}

var hero = {
	speed:256,
	x:0,
	y:0
}
var monster = {
    speed:100,
	x:0,
	y:0
}
var trunk = {
	x:0,
	y:0
}
var caught = 0

var keysDown = {}
document.addEventListener('keydown', keydownHandle, false)
function keydownHandle(evt){
    keysDown[evt.keyCode] = true
    // Prevent scroll with the keyboard
    evt.preventDefault();
}

document.addEventListener('keyup', keyupHandler, false)
function keyupHandler(evt){
    delete keysDown[evt.keyCode]
}

function reset(){
    hero.x = canvas.width/2
    hero.y = canvas.height/2

    trunk.x = 32 + (Math.random()*(canvas.width-100))
    trunk.y = 32 + (Math.random()*(canvas.height-100))

    monster.x = 32 + (Math.random()*(canvas.width-64))
    monster.y = 32 + (Math.random()*(canvas.height-64))
}
		
function update(mod){
	if(38 in keysDown){
		hero.y -= hero.speed * mod
	}
	if(40 in keysDown){
		hero.y += hero.speed * mod
	}
	if(37 in keysDown){
		hero.x -= hero.speed * mod
	}
	if(39 in keysDown){
		hero.x += hero.speed * mod
	}
	if(monster.y < hero.y-2){
			monster.y += monster.speed * mod
		}else if(monster.y > hero.y+2){
			monster.y -= monster.speed * mod
		}else{
			if(monster.x < hero.x)
				monster.x += monster.speed * mod
			if(monster.x > hero.x)
				monster.x -= monster.speed * mod
		}
}

function render(){
	ctx.drawImage(fundo, 0, 0)
	ctx.drawImage(heroi, hero.x, hero.y)
	ctx.drawImage(bau, trunk.x, trunk.y)
	ctx.drawImage(monstro, monster.x, monster.y)
	ctx.fillStyle = "rgb(250, 250, 250)"
	ctx.font = "24px Helvetica"
	ctx.textAlign = "left"
	ctx.textBaseline = "top"
	ctx.fillText("Baús coletados: " + caught, 32, 32)
}

var then = Date.now()
function main(){
	const now = Date.now()
	let delta = now-then
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	update(delta/1000)
	render()
	colisao()
	coliderMonstro()
	then = now
	requestAnimationFrame(main)
}

function colisao(){
	if(
		hero.x <= (trunk.x + 32)
		&& trunk.x <= (hero.x + 32)
		&& hero.y <= (trunk.y + 32)
		&& trunk.y <= (hero.y + 32)
	){
        ++caught
        monster.speed += 5
		reset()
	}
}
function coliderMonstro(){
	if(
	hero . x <= (monster . x + 32)
	&& monster . x <= (hero . x + 32)
	&& hero . y <= (monster . y + 32)
	&& monster . y <= (hero . y + 32)
	){
		// loser()
		reset()
	}
}
function loser(){
	ctx . fillStyle = "rgba(0, 0, 0, 0.7)"
	ctx . fillRect(75, 105, 362, 245)
	ctx . fillStyle = "red"
	ctx . font = "24px Helvetica"
    ctx . fillText("F5, meu bom", 210, 220)
}