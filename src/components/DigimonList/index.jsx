import { fetchDigimonList } from "@/api/digimonApi";
import React, { useEffect, useState } from "react";

const DigimonList = () => {
  const [digimonList, setDigimonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const pageSize = 10;

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
    <div>
      <h2 className="text-xl font-semibold mb-2">Digimon List</h2>
      <ul className="list-disc pl-5">
        {digimonList.map((digimon, index) => (
          <li key={index} className="mb-1">
            {digimon.name}
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

export default DigimonList;
