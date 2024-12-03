import { fetchDigimonList } from "@/api/digimonApi";
import React, { useEffect, useState } from "react";

const DigimonList = () => {
  const [digimonList, setDigimonList] = useState([]);

  useEffect(() => {
    const fetchDigimons = async () => {
      try {
        const digimons = await fetchDigimonList(1, 10);
        if (digimons && Array.isArray(digimons)) {
          setDigimonList(digimons);
        } else {
          console.error("Digimon data format error:", digimons);
        }
      } catch (error) {
        console.error("Error fetching Digimons:", error);
      }
    };

    fetchDigimons();
  }, []);

  if (digimonList.length === 0) {
    return <div>Loading Digimons...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Digimon List</h2>
      <ul className="list-disc pl-5">
        {digimonList.map((digimon, index) => (
          <li key={index} className="mb-1">
            {digimon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DigimonList;
