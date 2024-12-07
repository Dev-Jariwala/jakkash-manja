import { PDFViewer } from "@react-pdf/renderer";
import React, { useContext, useEffect, useState } from "react";
import ExportPDF from "../table2/ExportPDF";
import { preventScrollInNumber } from "../../assets/helper";
import { toast } from "react-toastify";
import Select from "react-select";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
import { RetailBillContext } from "../../store/retailBillContext";
import ClientReportPDF from "./ClientReportPDF";

const ClientReport = ({ clients }) => {
  const { wholeSaleBills } = useContext(WholeSaleContext);
  const { retailBills } = useContext(RetailBillContext);
  const [selectedClient, setSelectedClient] = useState({});
  const [client, setClient] = useState({});
  useEffect(() => {
    function fetchWdBills() {
      const result = wholeSaleBills.filter((bill) =>
        selectedClient.wholeSaleBills.includes(bill._id)
      );
      // console.log(result);
      return result;
    }

    if (Object.keys(selectedClient).length > 0) {
      const newClientDetails = { ...selectedClient };
      newClientDetails.wdBills = fetchWdBills();
      setClient(newClientDetails);
    }
  }, [selectedClient]);
  return (
    <>
      <div className="w-full flex">
        <div className="pt-3 px-3 w-full">
          {/* Client Name. */}
          <div className="relative z-0 w-full mb-5 group">
            <Select
              options={clients.map((client) => ({
                value: client._id,
                label: client.name,
              }))}
              isSearchable
              placeholder="Select a client"
              className="react-select-container"
              classNamePrefix="react-select"
              // value={selectedClient.name}
              onChange={(selectedOption) => {
                const clientData = clients.find(
                  (cli) => cli._id === selectedOption.value
                );
                if (clientData) {
                  setSelectedClient(clientData);
                } else {
                  toast.warn("Not found");
                }
              }}
            />
          </div>
        </div>
        {Object.keys(client).length > 0 && (
          <div className="my-3">
            <PDFViewer width="900" height="500">
              <ClientReportPDF client={client} />
            </PDFViewer>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientReport;
