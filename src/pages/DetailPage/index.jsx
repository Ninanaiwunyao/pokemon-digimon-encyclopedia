import { fetchDigimonDetail } from "@/api/digimonApi";
import { fetchPokemonDetail } from "@/api/pokemonApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = ({ type }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (type === "pokemon") {
          const result = await fetchPokemonDetail(id);
          setData({
            name: result.name,
            image: `https://img.pokemondb.net/artwork/large/${result.name}.jpg`,
            details: {
              Height: result.height,
              Weight: result.weight,
              "Base Experience": result.base_experience,
            },
          });
        } else if (type === "digimon") {
          const result = await fetchDigimonDetail(id);
          setData({
            name: result.name,
            image: result.images?.[0]?.href || "",
            details: {
              Date: result.releaseDate,
              Evolutions: result.nextEvolutions?.length || "N/A",
            },
          });
        }
      } catch (err) {
        setError("Failed to load details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  if (loading) {
    return <div>Loading {type} details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black via-gray-800 to-gray-900 p-4">
      <div className="p-6 max-w-4xl w-full bg-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={data.image}
            alt={data.name}
            className="w-full md:w-1/2 h-64 object-contain rounded-lg shadow-xl border-4 border-yellow-500 bg-white "
          />
          <div className="flex flex-col justify-center md:items-start items-center md:w-1/2 space-y-4 pl-12">
            <h1 className="text-3xl font-extrabold text-yellow-400 mb-4">
              {data.name}
            </h1>
            <ul className="text-lg space-y-2 text-white">
              {Object.entries(data.details).map(([key, value]) => (
                <li key={key} className="flex items-center gap-2">
                  <span className="text-yellow-300 font-semibold">{key}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Additional Information
          </h2>
          <p className="text-md text-gray-300 mt-2">
            This section can be used to add more details about the character,
            abilities, or any other relevant information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
