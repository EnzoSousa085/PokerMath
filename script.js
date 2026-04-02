let playerHP = 100
let pokemonHP = 100
let score = 0
let playerName = "Jogador"
let level = "easy"

let correctAnswer = 0
let questionPool = []

let timeLeft = 180
let timer
let gameRunning = false

let playerPokemon = 25

const pokemons = [
{nome:"Pikachu", id:25},
{nome:"Charizard", id:6},
{nome:"Gengar", id:94},
{nome:"Dragonite", id:149},
{nome:"Mewtwo", id:150},
{nome:"Alakazam", id:65}
]

function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min
}

/* =========================
GERADORES LATEX
========================= */

function generateEasy(){

let a = rand(10,99)
let b = rand(10,99)

let type = rand(1,4)

if(type===1) return {q:`${a}+${b}`,a:a+b}
if(type===2) return {q:`${a}-${b}`,a:a-b}
if(type===3) return {q:`${a}\\times${b}`,a:a*b}

let n = rand(2,15)
return {q:`${n}^2`,a:n*n}

}

function generateMedium(){

let type = rand(1,5)

if(type===1){
let n = rand(2,20)
return {q:`\\sqrt{${n*n}}`,a:n}
}

if(type===2){
let a = rand(2,12)
let b = rand(2,12)
return {q:`${a}^2+${b}^2`,a:a*a+b*b}
}

if(type===3){
let a = rand(2,5)
return {q:`\\log_{10}(10^{${a}})`,a:a}
}

if(type===4){
let a = rand(2,10)
let b = rand(2,10)
return {q:`${a}^3+${b}^2`,a:a*a*a+b*b}
}

let n = rand(2,10)
return {q:`\\sqrt{${n*n}}`,a:n}

}

function generateHard(){

let type = rand(1,6)

if(type===1){
let n = rand(2,10)
return {q:`\\frac{d}{dx}(${n}x)`,a:n}
}

if(type===2){
let n = rand(2,6)
return {q:`\\frac{d}{dx}(x^{${n}})\\Big|_{x=1}`,a:n}
}

if(type===3){
let a = rand(1,10)
let b = rand(1,10)
return {q:`\\int_0^{${b}} ${a}\\,dx`,a:a*b}
}

if(type===4){
let n = rand(2,6)
return {q:`\\int_0^{${n}} x\\,dx`,a:(n*n)/2}
}

if(type===5){
let n = rand(2,10)
return {q:`\\lim_{x\\to\\infty}\\frac{${n}}{x}`,a:0}
}

let n = rand(2,8)
return {q:`\\frac{d}{dx}(${n}x^2)\\Big|_{x=1}`,a:2*n}

}

/* =========================
GERAR BANCO GRANDE
========================= */

function generatePool(){

questionPool = []

for(let i=0;i<500;i++){

if(level==="easy") questionPool.push(generateEasy())
if(level==="medium") questionPool.push(generateMedium())
if(level==="hard") questionPool.push(generateHard())

}

shuffle(questionPool)

}

function shuffle(array){
for(let i=array.length-1;i>0;i--){
let j=Math.floor(Math.random()*(i+1))
[array[i],array[j]]=[array[j],array[i]]
}
}

/* =========================
QUESTÃO NOVA
========================= */

function newQuestion(){

if(questionPool.length===0){
generatePool()
}

let q = questionPool.pop()

document.getElementById("question").innerHTML = `\\(${q.q}\\)`
correctAnswer = q.a

MathJax.typeset()

}

/* =========================
GAME
========================= */

function startGame(){

gameRunning = true

playerName = document.getElementById("playerName").value || "Jogador"
level = document.getElementById("level").value
playerPokemon = document.getElementById("playerPokemon").value

resetGame()
startTimer()
loadRanking()

document.getElementById("answer").disabled = false
}

function startTimer(){

clearInterval(timer)
timeLeft = 180

timer = setInterval(()=>{

timeLeft--

let min = Math.floor(timeLeft/60)
let sec = timeLeft%60

document.getElementById("time").innerHTML =
`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`

if(timeLeft<=0){
clearInterval(timer)
endGame()
}

},1000)

}

function endGame(){

gameRunning=false
document.getElementById("answer").disabled=true

saveScore()
alert("Tempo acabou! Pontuação: "+score)
resetGame()

}

function randomPokemon(){

let enemy=pokemons[Math.floor(Math.random()*pokemons.length)]

document.getElementById("pokemonName").innerHTML=enemy.nome

document.getElementById("pokemonSprite").src=
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${enemy.id}.png`

document.getElementById("playerSprite").src=
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${playerPokemon}.png`

}

function attack(){

if(!gameRunning) return

let user=parseFloat(document.getElementById("answer").value)

if(user===correctAnswer){

pokemonHP-=25
score+=10
document.getElementById("log").innerHTML="Correto ⚡"

}else{

playerHP-=15
document.getElementById("log").innerHTML="Errado 💥"

}

updateHP()
document.getElementById("answer").value=""
checkBattle()
newQuestion()

}

function updateHP(){

document.getElementById("pokemonHP").style.width=pokemonHP+"%"
document.getElementById("playerHP").style.width=playerHP+"%"
document.getElementById("score").innerHTML=score

}

function checkBattle(){

if(pokemonHP<=0){
score+=50
pokemonHP=100
randomPokemon()
}

if(playerHP<=0){
clearInterval(timer)
endGame()
}

}

function saveScore(){

let ranking=JSON.parse(localStorage.getItem("ranking"))||[]

ranking.push({
name:playerName,
score:score,
level:level
})

ranking.sort((a,b)=>b.score-a.score)
ranking=ranking.slice(0,10)

localStorage.setItem("ranking",JSON.stringify(ranking))
loadRanking()

}

function loadRanking(){

let ranking=JSON.parse(localStorage.getItem("ranking"))||[]

let list=document.getElementById("rankingList")
list.innerHTML=""

ranking.forEach(p=>{
let li=document.createElement("li")
li.innerHTML=`${p.name} - ${p.score} (${p.level})`
list.appendChild(li)
})

}

function resetGame(){

playerHP=100
pokemonHP=100
score=0
questionPool=[]

randomPokemon()
newQuestion()
updateHP()

}

document.getElementById("answer").disabled=true
loadRanking()
