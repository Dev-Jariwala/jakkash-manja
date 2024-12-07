import React, { useContext, useEffect, useRef, useState } from "react";
import { ClientContext } from "../store/clientContext";
import {
  cltableBtn,
  cltableHeaders,
  cltableKeys,
  cltableName,
  cltableReport,
  cltableTHs,
} from "../assets/props/tableProps/cltableProps";
import Loader1 from "../components/loaders/Loader1";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";
import Modal from "../components/modal/Modal";
import { PDFViewer } from "@react-pdf/renderer";
import ExportPDF from "../components/table2/ExportPDF";
import Select from "react-select";
import { toast } from "react-toastify";
import ClientReport from "../components/client/ClientReport";
const ClientPage = () => {
  const { clients, fetching } = useContext(ClientContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [loading, setLoading] = useState(true);
  const [exportPDF, setExportPDF] = useState({
    status: false,
    clientData: {},
  });
  const focusRef = useRef(null);
  useEffect(() => {
    if (fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetching]);
  function onNewClient() {
    setFormState({
      status: "newClient",
      formData: { name: "", mobileNumber: 0, address: "" },
    });
  }
  const onexportPDF = () => {
    setLoading(true);
    try {
      setExportPDF({
        status: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader1 />}
      {exportPDF.status && (
        <Modal
          isOpen={exportPDF.status}
          onClose={() => setExportPDF({ status: false })}
          title={`Client Report PDF:`}
        >
          <div className="my-3">
            <ClientReport clients={clients} />
          </div>
        </Modal>
      )}
      <PageTitle pageName={"Client"}>
        <Table2Wrapper
          rows={clients}
          tableName={cltableName}
          tableBtn={cltableBtn}
          onTableBtn={onNewClient}
          ths={cltableTHs}
          mainKeys={cltableKeys}
          exportData={clients}
          headers={cltableHeaders}
          onexportPDF={onexportPDF}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default ClientPage;
