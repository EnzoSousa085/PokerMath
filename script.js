let playerHP = 100
let pokemonHP = 100
let score = 0

let a,b,op

const pokemons = [
{nome:"Pikachu", id:25},
{nome:"Charmander", id:4},
{nome:"Bulbasaur", id:1},
{nome:"Squirtle", id:7},
{nome:"Eevee", id:133},
{nome:"Jigglypuff", id:39},
{nome:"Meowth", id:52},
{nome:"Psyduck", id:54}
]

function randomPokemon(){
let p = pokemons[Math.floor(Math.random()*pokemons.length)]

document.getElementById("pokemonName").innerHTML = p.nome
document.getElementById("pokemonSprite").src =
`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`
}

function newQuestion(){

a = Math.floor(Math.random()*10)+1
b = Math.floor(Math.random()*10)+1

let operations = ["+","-","×"]
op = operations[Math.floor(Math.random()*3)]

document.getElementById("question").innerHTML =
`${a} ${op} ${b}`
}

function correctAnswer(){

if(op==="+") return a+b
if(op==="-") return a-b
if(op==="×") return a*b

}

function attack(){

let user = parseInt(document.getElementById("answer").value)

if(user === correctAnswer()){

pokemonHP -= 20
score += 10

document.getElementById("log").innerHTML =
"Acertou! Ataque super efetivo ⚡"

}else{

playerHP -= 15

document.getElementById("log").innerHTML =
"Errou! O Pokémon atacou 💥"

}

updateHP()
document.getElementById("answer").value = ""
newQuestion()
checkBattle()
}

function updateHP(){

document.getElementById("pokemonHP").style.width =
pokemonHP + "%"

document.getElementById("playerHP").style.width =
playerHP + "%"

document.getElementById("score").innerHTML = score

}

function checkBattle(){

if(pokemonHP <= 0){

score += 50

document.getElementById("log").innerHTML =
"Você venceu! Novo Pokémon apareceu!"

pokemonHP = 100
randomPokemon()

}

if(playerHP <= 0){

document.getElementById("log").innerHTML =
"Game Over!"

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