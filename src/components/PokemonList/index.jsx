import { fetchPokemonList } from "@/api/pokemonApi";
import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const offset = (page - 1) * pageSize;
        const { results, count } = await fetchPokemonList(pageSize, offset);

        if (Array.isArray(results)) {
          setPokemonList(results);
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
    <div>
      <h2 className="text-xl font-semibold mb-2">Pokémon List</h2>
      <ul className="list-disc pl-5">
        {pokemonList.map((pokemon, index) => (
          <li key={index} className="mb-1">
            {pokemon.name}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-xl">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
