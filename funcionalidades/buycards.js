const figurebuycards = document.getElementById('pokemons-container')
let pokemons = []
let page = 1
let count = 0
let isFiltering = false

function getPokemonData (url) {
    fetch (url)
    .then((response) => response.json())
    .then((response) => {
        addPokemonIntoHTML(response)
    })
    .catch((error) => console.log(error))
}

function getAllPokemons (count) {
    removePokemon()
    isFiltering = false
    pokemons = []
    page = 1
    fetch (`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
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
            <i class="fa fa-heart"></i>
        </div>
        <section>
            <img class="pokemon-img" src="${pokemon.sprites.other["home"].front_default }" alt="">
        </section>
        <div class="pokemon-footer">
            <p>${pokemon.base_experience}</p>
            <button class="btn-buy">Buy</button>
        </div>
    `
    figurebuycards.appendChild(pokemonCard)
}

function getMorePokemons() {
    count += 20 
    getPokemons(isFiltering)
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
function filterPokemons(name) {
    removePokemon()
    isFiltering = true
    fetch(`https://pokeapi.co/api/v2/type/${name}`)
    .then((response) => response.json())
    .then((response) => {
        pokemons = response.pokemon
        page = 1
        pagination(page)
    })
    .catch((error) => console.log(error))
}

function pagination(pageIndex) {
    const newPokemon = pokemons.slice((pageIndex - 1) * 20, pageIndex * 20)
    newPokemon.forEach((pokemon) => {
        getPokemonData(pokemon.pokemon.url)
    })
}

function getPokemons(filter){
    if (!filter) {
        getAllPokemons(count)
    } else {
        filterPokemons(filter)
    }
}

// function clickLike () {
//     const like = document.getElementById('like')
//     like.addEventListener('click', () => {
//         like.classList.toggle('heart-regular')
//         like.classList.toggle('heart-solid')
//     })
// }

getAllPokemons(count)