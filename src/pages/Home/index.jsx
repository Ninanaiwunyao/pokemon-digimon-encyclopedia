import DigimonList from "@/components/DigimonList";
import PokemonList from "@/components/PokemonList";
import ToggleSwitch from "@/components/ToggleSwitch";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [isPokemon, setIsPokemon] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/pokemon") {
      setIsPokemon(true);
    } else if (location.pathname === "/digimon") {
      setIsPokemon(false);
    }
  }, [location.pathname]);

  const handleToggle = (isPokemonSelected) => {
    setIsPokemon(isPokemonSelected);
    setCurrentPage(1);
    if (isPokemonSelected) {
      navigate("/pokemon");
    } else {
      navigate("/digimon");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (isPokemon) {
      navigate(`/pokemon?page=${newPage}`);
    } else {
      navigate(`/digimon?page=${newPage}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pokémon and Digimon Encyclopedia
      </h1>

      <ToggleSwitch isPokemon={isPokemon} onToggle={handleToggle} />

      <div className="mt-4">
        {isPokemon ? (
          <PokemonList
            currentPage={currentPage}
            setTotalPages={setTotalPages}
          />
        ) : (
          <DigimonList
            currentPage={currentPage}
            setTotalPages={setTotalPages}
          />
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-center space-x-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Prev
            </button>
          )}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
