const title = document.getElementById('title')
const pokemonList: HTMLUListElement | null = document.querySelector('.pokemon_list')

const insertPokemonIntoDOM = async (pokemon: PokemonDetails): Promise<void> => {

    console.log(pokemon)
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

        const hasDefault = key.includes('default')

        if(!hasDefault) continue

        const imageUrl = sprites[key]

        if (typeof imageUrl !== 'string' || !imageUrl.includes('.png')) continue

        pokemonItem += `<img src=${imageUrl} alt=${key}>`
    }
    pokemonItem += `</div>`

    pokemonItem += `</li>`


    pokemonList!.innerHTML += pokemonItem
}

this.onload = async () => {
    const { results: pokemons }: { results: Pokemon[] } = await fetchPokemons()

    pokemons.forEach(async pokemon => {
        const details = await getPokemonDetails(pokemon.url)

        insertPokemonIntoDOM(details)
    });
}