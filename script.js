let playerHP = 100
let pokemonHP = 100
let score = 0

let currentAnswer = ""

const pokemons = [
{nome:"Pikachu", id:25},
{nome:"Charmander", id:4},
{nome:"Gengar", id:94},
{nome:"Alakazam", id:65},
{nome:"Mewtwo", id:150}
]

const questions = [

{
q:"∫ x dx",
a:["x^2/2 + C","(x^2)/2 + C","0.5x^2 + C"]
},

{
q:"∫ 2x dx",
a:["x^2 + C"]
},

{
q:"d/dx (x^2)",
a:["2x"]
},

{
q:"∫ cos(x) dx",
a:["sin(x) + C"]
},

{
q:"∫ sen(x) dx",
a:["-cos(x) + C"]
},

{
q:"Derivada de sen(x)",
a:["cos(x)"]
},

{
q:"∫ 3x^2 dx",
a:["x^3 + C"]
},

{
q:"∫ 1/x dx",
a:["ln|x| + C","ln(x) + C"]
},

{
q:"Quanto é 12² + 5³ ?",
a:["269"]
},

{
q:"Resolva: 2x + 4 = 10",
a:["3","x=3"]
}

]

function normalize(str){
return str
.toLowerCase()
.replace(/\s/g,"")
.replace("²","^2")
.replace("³","^3")
}

function randomPokemon(){
let p = pokemons[Math.floor(Math.random()*pokemons.length)]

document.getElementById("pokemonName").innerHTML = p.nome
document.getElementById("pokemonSprite").src =
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`
}

function newQuestion(){

let q = questions[Math.floor(Math.random()*questions.length)]

document.getElementById("question").innerHTML = q.q

currentAnswer = q.a
}

function attack(){

let user = document.getElementById("answer").value
user = normalize(user)

let correct = false

for(let ans of currentAnswer){
if(user === normalize(ans)) correct = true
}

if(correct){

pokemonHP -= 25
score += 20

document.getElementById("log").innerHTML =
"Resposta correta! Ataque matemático ⚡"

}else{

playerHP -= 15

document.getElementById("log").innerHTML =
"Resposta errada! Pokémon atacou 💥"
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

document.getElementById("log").innerHTML =
"Você derrotou o Pokémon!"

pokemonHP = 100
randomPokemon()
}

if(playerHP <= 0){

alert("Game Over! Pontuação: " + score)
resetGame()
}

}

function resetGame(){
playerHP = 100
pokemonHP = 100
score = 0

randomPokemon()
newQuestion()
updateHP()
}

randomPokemon()
newQuestion()
updateHP()