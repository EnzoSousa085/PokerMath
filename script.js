let playerHP = 100
let pokemonHP = 100
let score = 0
let playerName = "Jogador"
let level = "easy"

let usedQuestions = []
let correctAnswer = 0

let timeLeft = 180
let timer

const pokemons = [
{nome:"Pikachu", id:25},
{nome:"Charizard", id:6},
{nome:"Gengar", id:94},
{nome:"Dragonite", id:149},
{nome:"Mewtwo", id:150},
{nome:"Alakazam", id:65}
]

const questions = {

easy:[
{q:"12 + 8", a:20},
{q:"15 × 3", a:45},
{q:"100 ÷ 5", a:20},
{q:"9²", a:81},
{q:"√64", a:8},
{q:"25 + 75", a:100},
{q:"6 × 7", a:42},
{q:"14 + 19", a:33},
{q:"5² + 5²", a:50},
{q:"18 + 27", a:45}
],

medium:[
{q:"12² + 5³", a:269},
{q:"15 × (8 + 3)", a:165},
{q:"√144 + 9", a:21},
{q:"(20 × 6) - 4", a:116},
{q:"17²", a:289},
{q:"(8×9)+(7×6)", a:114},
{q:"(12×12)+25", a:169},
{q:"11² + 10²", a:221},
{q:"(50×6)", a:300},
{q:"(9×9×2)", a:162}
],

hard:[
{q:"25² - 5²", a:600},
{q:"(15×15)-100", a:125},
{q:"(6×6×6)", a:216},
{q:"(50×6)+144", a:444},
{q:"(18²)+75", a:399},
{q:"(30×12)-90", a:270},
{q:"(45×8)-60", a:300},
{q:"(99×9)", a:891},
{q:"(125×4)", a:500},
{q:"(64×8)", a:512}
]

}

function startGame(){

playerName = document.getElementById("playerName").value || "Jogador"
level = document.getElementById("level").value

resetGame()
startTimer()
loadRanking()
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

if(timeLeft <= 0){

clearInterval(timer)
endGame()

}

},1000)

}

function endGame(){

saveScore()
alert("Tempo acabou! Pontuação: " + score)
resetGame()

}

function randomPokemon(){
let p = pokemons[Math.floor(Math.random()*pokemons.length)]

document.getElementById("pokemonName").innerHTML = p.nome
document.getElementById("pokemonSprite").src =
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`
}

function newQuestion(){

let list = questions[level]

if(usedQuestions.length === list.length){
usedQuestions = []
}

let index

do{
index = Math.floor(Math.random()*list.length)
}while(usedQuestions.includes(index))

usedQuestions.push(index)

let q = list[index]

document.getElementById("question").innerHTML = q.q
correctAnswer = q.a
}

function attack(){

let user = parseInt(document.getElementById("answer").value)

if(user === correctAnswer){

pokemonHP -= 25
score += 10

document.getElementById("log").innerHTML =
"Correto ⚡"

}else{

playerHP -= 15

document.getElementById("log").innerHTML =
"Errado 💥"
}

updateHP()
document.getElementById("answer").value=""
checkBattle()
newQuestion()
}

function updateHP(){
document.getElementById("pokemonHP").style.width = pokemonHP+"%"
document.getElementById("playerHP").style.width = playerHP+"%"
document.getElementById("score").innerHTML = score
}

function checkBattle(){

if(pokemonHP <= 0){

score += 50
pokemonHP = 100
randomPokemon()

}

if(playerHP <= 0){

clearInterval(timer)
endGame()
}

}

function saveScore(){

let ranking = JSON.parse(localStorage.getItem("ranking")) || []

ranking.push({
name: playerName,
score: score,
level: level
})

ranking.sort((a,b)=> b.score-a.score)
ranking = ranking.slice(0,10)

localStorage.setItem("ranking", JSON.stringify(ranking))

loadRanking()
}

function loadRanking(){

let ranking = JSON.parse(localStorage.getItem("ranking")) || []

let list = document.getElementById("rankingList")
list.innerHTML=""

ranking.forEach(p=>{

let li = document.createElement("li")
li.innerHTML = `${p.name} - ${p.score} (${p.level})`
list.appendChild(li)

})

}

function resetGame(){
playerHP = 100
pokemonHP = 100
score = 0
usedQuestions = []

randomPokemon()
newQuestion()
updateHP()
}

loadRanking()