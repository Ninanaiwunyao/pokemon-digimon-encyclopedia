import DigimonList from "@/components/DigimonList";
import PokemonList from "@/components/PokemonList";
import ToggleSwitch from "@/components/ToggleSwitch";
import React, { useState } from "react";

const Home = () => {
  const [isPokemon, setIsPokemon] = useState(true);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Pokémon and Digimon Encyclopedia
      </h1>
      <ToggleSwitch isPokemon={isPokemon} onToggle={setIsPokemon} />

      <div className="mt-4">
        {isPokemon ? <PokemonList /> : <DigimonList />}
      </div>
    </div>
  );
};

export default Home;
