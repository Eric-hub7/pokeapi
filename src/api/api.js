import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get("/pokemon", {
    params: { limit, offset },
  });

  return response.data.results;
};

export const getPokemonsWithDetails = async (limit = 20, offset = 0) => {
  try {

    const basicList = await getPokemons(limit, offset);

    const requests = basicList.map((pokemon) => {
      const pokemonDetailsPromise = axios.get(pokemon.url);
      const speciesPromise = axios.get(pokemon.url.replace('/pokemon/', '/pokemon-species/'));
      return Promise.all([pokemonDetailsPromise, speciesPromise]);
    });

    const responses = await Promise.all(requests);

    return responses.map(([detailsRes, speciesRes]) => {
      const pokemonData = detailsRes.data;
      const speciesData = speciesRes.data;
      
      const flavorText = speciesData.flavor_text_entries
        ?.find((entry) => entry.language.name === 'en')
        ?.flavor_text.replace(/\n/g, ' ') || 'No description available';
      
      const moves = pokemonData.moves.slice(0, 4).map((move) => move.move.name);
      
      return {
        ...pokemonData,
        description: flavorText,
        topMoves: moves,
      };
    });
  } catch (error) {
    console.error("Error obtenint detalls dels Pokémon:", error);
    throw error;
  }
};