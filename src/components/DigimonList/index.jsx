import { fetchDigimonList } from "@/api/digimonApi";
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

export default DigimonList;
