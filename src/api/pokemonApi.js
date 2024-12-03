const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `${POKEMON_API_URL}?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon data");
    }
    const data = await response.json();
    return {
      results: data.results,
      count: data.count,
    };
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return { results: [], count: 0 };
  }
};

export const fetchPokemonDetail = async (id) => {
  try {
    const response = await fetch(`${POKEMON_API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon detail");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon detail:", error);
    return null;
  }
};
