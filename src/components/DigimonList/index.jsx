import { fetchDigimonList } from "@/api/digimonApi";
import Pagination from "@/components/Pagination";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const DigimonList = () => {
  const [digimonList, setDigimonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const pageSize = 12;
  const navigate = useNavigate();

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
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {digimonList.map((digimon) => (
          <div
            key={digimon.id}
            onClick={() => navigate(`/digimon/${digimon.id}`)}
            className="flex flex-col items-center justify-center border p-4 rounded-lg bg-white"
          >
            <img
              src={digimon.image}
              alt={digimon.name}
              className="w-24 h-24 object-fit mb-2"
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
