const figurebuycards = document.getElementById('pokemons-container')
let count = 0

function getPokemonData (url) {
    fetch (url)
    .then((response) => response.json())
    .then((response) => {
        addPokemonIntoHTML(response)
    })
    .catch((error) => console.log(error))
}

function getPokemons (offset) {
    fetch (`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        .then((response) => response.json())
        .then((response) => {
            response.results.forEach((pokemon) => {
                getPokemonData(pokemon.url)
            })
        })
        .catch((error) => console.log(error))
}

function addPokemonIntoHTML(pokemon) {
    console.log(pokemon)
    let pokemonCard = document.createElement('div')
    pokemonCard.className = 'pokemon-card'
    pokemonCard.innerHTML = `
        <div class="pokemon-header">
        <p>${pokemon.name}</p>
        <img class="pokemon-img" src="${pokemon.sprites.front_default}" alt="">
        <div class="pokemon-footer">
            <p>Power ${pokemon.base_experience}</p>
            <button class="btn-buy">BUY</button>
        </div>
    `
    figurebuycards.appendChild(pokemonCard)
}

function getMorePokemons() {
    count += 20 
    getPokemons(count)
}

//limpiar cartas
function removePokemon () {
    if (figurebuycards.hasChildNodes()){
        let children = figurebuycards.childNodes
        const nodeLength = children.length
        for (let i = 0; i < nodeLength; i++) {
            figurebuycards.removeChild(children[0])
        }
    }

}

//filtros
function filterPokemons(numberType, offset) {
    removePokemon()
    fetch(`https://pokeapi.co/api/v2/type/${numberType}${offset}&limit=20`)
    .then((response) => response.json())
    .then((response) => {
        response.pokemon.forEach((pokemon) => {
            getPokemonData(pokemon.pokemon.url)
        })
    })
    .catch((error) => console.log(error))
}

getPokemons(count)