import React, { Fragment, useContext, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { CollectionContext } from "../../store/collectionContext";
import Table2Features from "./Table2Features";
import { CSVLink } from "react-csv";
import TooltipItem from "../tooltip/ToolTipItem";
import { Menu, Transition } from "@headlessui/react";

const Table2Wrapper = ({
  showIndex = true,
  tableName,
  tableBtn,
  rows,
  onTableBtn,
  ths,
  actions,
  mainKeys,
  headers,
  exportData,
  filters = [],
  onexportPDF,
}) => {
  const { activeColl } = useContext(CollectionContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const filteredRows = rows?.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  // pagination calculation
  const PAGE_SIZE = pageSize;
  const totalPages = Math.ceil(filteredRows?.length / PAGE_SIZE);
  const indexOfLastRow = currentPage * PAGE_SIZE;
  const indexOfFirstRow = indexOfLastRow - PAGE_SIZE;

  const currentRows = filteredRows?.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-4 lg:px-12">
      {/* Start coding here */}
      <div className="bg-white flex flex-col sm:flex-row items-center justify-between mb-3 py-3 px-4 dark:bg-gray-800  relative shadow-md rounded-lg overflow">
        <div className=" text-l sm:text-sm mr-3 font-bold text-gray-600 uppercase dark:text-gray-400">
          {" "}
          ( {activeColl?.collectionName} ) {tableName}
        </div>
        <div className="flex items-center sm:justify-normal sm:w-auto sm:mt-0 justify-between w-full mt-2">
          {tableBtn && (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md text-xs"
              onClick={onTableBtn}
            >
              {tableBtn}
            </button>
          )}
          {/* export button */}
          {exportData && headers && (
            <>
              <TooltipItem position="right" tooltipsText="export">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="w-8 h-8 inline-flex items-center justify-center ml-3 gap-x-2 text-xs font-medium rounded-lg border border-gray-200  bg-teal-500 text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-600 dark:border-gray-700 dark:text-white dark:hover:bg-green-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      <span className="material-icons text-sm">ios_share</span>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          <div
                            onClick={onexportPDF}
                            className="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                          >
                            <span className="material-icons">description</span>
                            Report
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          <div>
                            <CSVLink
                              data={exportData}
                              filename={tableName}
                              headers={headers}
                            >
                              <div className="flex items-center cursor-pointer gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700">
                                <span className="material-icons">download</span>
                                CSV File
                              </div>
                            </CSVLink>
                          </div>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </TooltipItem>
            </>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden">
        <Table2Features
          filters={filters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPageSize={setPageSize}
        />
        <Table
          ths={ths}
          showIndex={showIndex}
          currrentRows={currentRows}
          indexOfFirstRow={indexOfFirstRow}
          actions={actions}
          mainKeys={mainKeys}
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          setGoto={setGoto}
          goto={goto}
          indexOfFirstRow={indexOfFirstRow}
          indexOfLastRow={indexOfLastRow}
          totalRows={rows.length}
        />
      </div>
    </div>
  );
};

export default Table2Wrapper;
