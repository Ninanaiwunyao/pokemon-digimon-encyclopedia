import { fetchPokemonList } from "@/api/pokemonApi";
import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemons = await fetchPokemonList(10);
        if (pokemons && Array.isArray(pokemons)) {
          setPokemonList(pokemons);
        } else {
          console.error("Pokémon data format error:", pokemons);
        }
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemons();
  }, []);

  if (pokemonList.length === 0) {
    return <div>Loading Pokémon...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Pokémon List</h2>
      <ul className="list-disc pl-5">
        {pokemonList.map((pokemon, index) => (
          <li key={index} className="mb-1">
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
