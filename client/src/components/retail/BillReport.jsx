import { PDFViewer } from "@react-pdf/renderer";
import React, { useState } from "react";
import ExportPDF from "../table2/ExportPDF";
import { preventScrollInNumber } from "../../assets/helper";
import { toast } from "react-toastify";

const BillReport = ({ exportData, headers, title }) => {
  const [showReportPDF, setShowReportPDF] = useState({
    status: false,
    range: { fromBill: "", toBill: "" },
    dataToExport: [],
  });
  return (
    <>
      <div className="w-full flex">
        <div className="pt-3 px-3">
          <form
            className="max-w-md mx-auto my-4"
            onSubmit={(e) => {
              e.preventDefault();
              const filteredBills = exportData
                ?.reverse()
                ?.filter(
                  (bill) =>
                    bill.BillNo >= showReportPDF.range.fromBill &&
                    bill.BillNo <= showReportPDF.range.toBill
                );
              if (filteredBills.length <= 0) {
                return toast.info("No Bills Found!");
              } else {
                setShowReportPDF((prev) => {
                  return { ...prev, dataToExport: filteredBills };
                });
                toast.success("Bills Fetched!");
              }
            }}
          >
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* From Bill No */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  onFocus={preventScrollInNumber}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={showReportPDF.range.fromBill}
                  onChange={(e) => {
                    setShowReportPDF((prev) => ({
                      ...prev,
                      range: {
                        ...prev.range,
                        fromBill:
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : "",
                      },
                    }));
                  }}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  From Bill No:
                </label>
              </div>
              {/* To Bill No */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="number"
                  onFocus={preventScrollInNumber}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={showReportPDF.range.toBill}
                  onChange={(e) => {
                    setShowReportPDF((prev) => ({
                      ...prev,
                      range: {
                        ...prev.range,
                        toBill:
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : "",
                      },
                    }));
                  }}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  To Bill No:
                </label>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Fetch Bills
              </button>
            </div>
          </form>
        </div>
        {showReportPDF.dataToExport?.length > 0 && (
          <div className="my-3">
            <PDFViewer width="700" height="500">
              <ExportPDF
                exportData={showReportPDF.dataToExport}
                headers={headers}
                title={title}
              />
            </PDFViewer>
          </div>
        )}
      </div>
    </>
  );
};

export default BillReport;
