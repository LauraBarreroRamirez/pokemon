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

getPokemons(count)