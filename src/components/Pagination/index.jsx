import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div className="flex justify-center">
      <div className="mt-16 flex justify-between w-96">
        <button
          onClick={onPreviousPage}
          className="px-4 py-2 bg-red-500 text-white rounded"
          disabled={currentPage === 1}
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
        <span className="text-xl text-white">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={onNextPage}
          className="px-4 py-2 bg-red-500 text-white rounded"
          disabled={currentPage === totalPages}
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

export default Pagination;
