const url = 'https://pokeapi.co/api/v2/pokemon'


const fetchPokemons = (url: string) => fetch(url)
    .then(response => response.json())
    .then(({ results, next, ...rest }) => {

        console.log(rest);

        // results.forEach(pokemon => {
        //     insertPokemonIntoDOM(pokemon)
        //         .then(console.log)
        // })

        // if (next) getPokemons(next)

    })
    .catch(console.error)

fetchPokemons(url)


const pokemon = {}