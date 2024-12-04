import React from "react";

const ToggleSwitch = ({ isPokemon, onToggle }) => {
  return (
    <div className="flex justify-center pt-16">
      <button
        className={`px-6 py-3 font-semibold transition-colors ${
          isPokemon
            ? "bg-red-500 text-white"
            : "bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
        }`}
        onClick={() => onToggle(true)}
        style={{ borderRadius: 0 }}
      >
        Pokémon
      </button>
      <button
        className={`px-6 py-3 font-semibold transition-colors ${
          !isPokemon
            ? "bg-red-500 text-white"
            : "bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
        }`}
        onClick={() => onToggle(false)}
        style={{ borderRadius: 0 }}
      >
        Digimon
      </button>
    </div>
  );
};

export default ToggleSwitch;
