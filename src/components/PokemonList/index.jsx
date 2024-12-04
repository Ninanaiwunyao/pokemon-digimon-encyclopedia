import { fetchPokemonList } from "@/api/pokemonApi";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 12;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * pageSize;
        const { results, count } = await fetchPokemonList(pageSize, offset);

        if (Array.isArray(results)) {
          const updatedPokemons = results.map((pokemon) => {
            const id = pokemon.url.split("/")[6];
            return { ...pokemon, id };
          });

          setPokemonList(updatedPokemons);
          setTotalPages(Math.ceil(count / pageSize));
        } else {
          throw new Error("Pokémon data format error");
        }
      } catch (error) {
        setError("Failed to load Pokémon data. Please try again later.");
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page]);

  if (loading) {
    return <div>Loading Pokémon...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex flex-col items-center justify-center border p-4 rounded-lg bg-white"
          >
            <img
              src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
              alt={pokemon.name}
              className="w-24 h-24 object-fit mb-2"
            />
            <span className="text-center">{pokemon.name}</span>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPreviousPage={() => setPage(Math.max(page - 1, 1))}
        onNextPage={() => setPage(Math.min(page + 1, totalPages))}
      />
    </div>
  );
};

export default PokemonList;
