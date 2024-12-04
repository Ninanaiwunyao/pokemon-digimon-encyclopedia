import DigimonList from "@/components/DigimonList";
import Header from "@/components/Header";
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

  return (
    <div className="bg-black min-h-screen">
      <Header />

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
    </div>
  );
};

export default Home;
