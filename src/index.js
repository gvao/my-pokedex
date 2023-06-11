
const titulo = document.getElementById('titulo')
const colorPicker = document.getElementById('color')
const pokemonList = document.querySelector('.pokemon_list')

const url = 'https://pokeapi.co/api/v2/pokemon'

const insertPokemonIntoDOM = ({ url }) =>
    new Promise(async (resolve, reject) => {
        const pokemon = await fetch(url)
            .then(res => res.json())

        const { name, sprites, types, ...rest } = pokemon

        let pokemonItem = ''

        pokemonItem += `<li>`
        pokemonItem += `<h3>Name: ${name}</h3>`

        pokemonItem += `<div class="types">`
        for (let key in types) {
            const type = types[key]
            pokemonItem += `<span>${type.type.name}</span>`
        }
        pokemonItem += `</div>`

        pokemonItem += `<div>`
        for (let key in sprites) {
            const imageUrl = sprites[key]

            if (typeof imageUrl !== 'string' || !imageUrl.includes('.png')) continue

            pokemonItem += `<img src=${imageUrl} alt=${key}>`
        }
        pokemonItem += `</div>`

        pokemonItem += `</li>`


        pokemonList.innerHTML += pokemonItem
        resolve(`Pokemon: ${name} added`)
    })

const getPokemons = (url) => fetch(url)
    .then(response => response.json())
    .then(({ results, next, ...rest }) => {

        console.log(rest);

        results.forEach(pokemon => {
            insertPokemonIntoDOM(pokemon)
                .then(console.log)
        })

        // if (next) getPokemons(next)

    })
    .catch(console.error)

getPokemons(url)

colorPicker.addEventListener('change', event => {
    const input = event.target
    const color = input.value

    titulo.style.color = color
})