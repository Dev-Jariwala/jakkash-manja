import React, { forwardRef, useState } from "react";

const DeleteCollection = forwardRef(
  ({ collectionName, cancelDelete, confirmDelete }, ref) => {
    const [cname, setCname] = useState("");
    return (
      <div className="px-4 pt-3 w-[500px]">
        <div
          className="flex flex-col p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  "
          role="alert"
        >
          <div className="flex items-center">
            <span className="material-icons text-m mr-2">warning</span>
            <span className="font-bold text-m">Droping {collectionName}!</span>
          </div>

          <div className="mt-2">
            Unexpected bad things can happen if you don’t read this!
          </div>
        </div>
        <div className="text-sm text-justify dark:text-gray-300">
          This action <span className="font-semibold">CANNOT</span> be undone.
          This will permanently delete the{" "}
          <span className="font-semibold">Products</span>,{" "}
          <span className="font-semibold">Stocks</span>, and{" "}
          <span className="font-semibold">Bills</span> from database.
        </div>
        <div className="text-sm text-justify my-2 dark:text-gray-200">
          <span className="font-semibold">
            Please type in the name of the collection to confirm.
          </span>
        </div>
        <input
          type="text"
          ref={ref}
          className={`border text-sm rounded-lg  block w-full p-2.5
          }`}
          placeholder="Example 2020"
          alue={cname}
          onChange={(e) => setCname(e.target.value)}
          required
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={confirmDelete}
            disabled={cname !== collectionName}
            className={`py-3 px-4 w-full inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600${
              cname !== collectionName && "opacity-50"
            }`}
          >
            I Understand, delete "{collectionName}" collection
          </button>
        </div>
      </div>
    );
  }
);

export default DeleteCollection;
