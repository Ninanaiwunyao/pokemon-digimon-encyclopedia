import { fetchPokemonList } from "@/api/pokemonApi";
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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pokemon List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="flex flex-col items-center justify-center border p-4 rounded-lg"
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

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={page === 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <span className="text-xl">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={page === totalPages}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
