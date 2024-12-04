import { fetchDigimonList } from "@/api/digimonApi";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";

const DigimonList = () => {
  const [digimonList, setDigimonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const pageSize = 12;

  useEffect(() => {
    const fetchDigimons = async () => {
      setLoading(true);
      setError(null);

      try {
        const { results, totalPages } = await fetchDigimonList(page, pageSize);
        setDigimonList(results);
        setTotalPages(totalPages);
      } catch (error) {
        setError("Failed to load Digimons. Please try again later.");
        console.error("Error fetching Digimons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDigimons();
  }, [page]);

  if (loading) {
    return <div>Loading Digimons...</div>;
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
      <h2 className="text-xl font-semibold mb-4">Digimon List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {digimonList.map((digimon) => (
          <div
            key={digimon.id}
            className="flex flex-col items-center justify-center border p-4 rounded-lg"
          >
            <img
              src={digimon.image}
              alt={digimon.name}
              className="w-24 h-24 object-cover mb-2"
            />
            <span className="text-center">{digimon.name}</span>
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

export default DigimonList;
