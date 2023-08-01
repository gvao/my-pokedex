type Pokemon = {
    name: string
    url: string
}

type PokemonType = {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

interface PokemonDetails {
    name: string;
    sprites: Record<string, string>;
    types: PokemonType[];
}


const fetcher = async (url: string) => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Error fetching data`)
        }

        return await response.json()

    } catch (err) {
        console.error(err)
    }
}

const fetchPokemons = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon'

    return fetcher(url)
}

async function getPokemonDetails(url: string): Promise<PokemonDetails> {
    const details = await fetcher(url)

    return details
}