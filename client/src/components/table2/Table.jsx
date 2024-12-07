import React, { useState } from "react";
import Row from "./Row";
import { Link } from "react-router-dom";

const Table = ({
  showIndex,
  currrentRows,
  indexOfFirstRow,
  ths,
  actions,
  mainKeys,
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {ths &&
                ths.map((th, index) => (
                  <th scope="col" className="px-4 py-3 " key={index}>
                    {th}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {currrentRows?.length > 0 &&
              currrentRows.map((row, rowIndex) => {
                const rowNumber = indexOfFirstRow + rowIndex;
                return (
                  <tr
                    key={rowIndex}
                    className={`${
                      row?.isLabour ? "bg-gray-100 dark:bg-gray-700" : ""
                    }${
                      row?.muted
                        ? "bg-gray-100 opacity-50 dark:bg-gray-700"
                        : ""
                    }  border-b dark:border-gray-700`}
                  >
                    <Row
                      showIndex={showIndex}
                      row={row}
                      rowIndex={rowNumber}
                      actions={actions}
                      mainKeys={mainKeys}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
