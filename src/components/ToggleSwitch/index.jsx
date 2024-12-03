import React from "react";

const ToggleSwitch = ({ isPokemon, onToggle }) => {
  return (
    <div className="flex justify-start space-x-2">
      <button
        className={`px-6 py-3 rounded-md text-white font-semibold transition-colors ${
          isPokemon ? "bg-blue-500" : "bg-gray-500 hover:bg-gray-600"
        }`}
        onClick={() => onToggle(true)}
      >
        Pokémon
      </button>
      <button
        className={`px-6 py-3 rounded-md text-white font-semibold transition-colors ${
          !isPokemon ? "bg-blue-500" : "bg-gray-500 hover:bg-gray-600"
        }`}
        onClick={() => onToggle(false)}
      >
        Digimon
      </button>
    </div>
  );
};

export default ToggleSwitch;
