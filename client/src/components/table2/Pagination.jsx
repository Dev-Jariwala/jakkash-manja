import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
  setCurrentPage,
  currentPage,
  totalPages,
  setGoto,
  goto,
  indexOfFirstRow,
  indexOfLastRow,
  totalRows,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-800 dark:text-gray-200 ">
      {/* <div className="flex flex-1 justify-between sm:hidden">
        <div
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            console.log("here");
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
          }}
        >
          Previous
        </div>

        <div
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 dark:text-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            console.log("here");
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
          }}
        >
          Next
        </div>
      </div> */}
      <div className="flex items-center text-sm justify-between sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700 dark:text-white mr-5">
            Showing <span className="font-medium">{indexOfFirstRow}</span> to{" "}
            <span className="font-medium">{indexOfLastRow}</span> of{" "}
            <span className="font-medium">{totalRows}</span> results
          </p>
        </div>
        <div className="flex items-center">
          {/* go to page */}
          {/* <div className="flex items-center">
            <input
              className="block w-20 py-2 px-2 text-gray-900 border border-gray-300 rounded-lg mr-1 bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              placeholder="Page No."
              onChange={(e) => setGoto(Number(e.target.value))}
              min="1"
            />
            <button
              className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                if (!goto || goto > totalPages || goto < 1) {
                  alert("Page Not Found!");
                } else {
                  setCurrentPage(goto);
                }
              }}
            >
              Go
            </button>
          </div> */}
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm cursor-pointer mr-3"
            aria-label="Pagination"
          >
            <div
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {currentPage > 1 && (
              <div
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset dark:text-gray-400 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                {currentPage - 1}
              </div>
            )}
            <div
              className={`relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white dark:text-gray-400  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"`}
            >
              {currentPage}
            </div>
            {currentPage < totalPages && (
              <div
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                {currentPage + 1}
              </div>
            )}
            {currentPage < totalPages - 1 && (
              <div
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => setCurrentPage((prev) => prev + 2)}
              >
                {currentPage + 2}
              </div>
            )}
            {currentPage < totalPages - 2 && (
              <div
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => setCurrentPage((prev) => prev + 3)}
              >
                {currentPage + 3}
              </div>
            )}

            <div
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
