import React, { useContext, useEffect, useRef, useState } from "react";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";
import { PurchasesContext } from "../store/purchaseContext";
import Loader1 from "../components/loaders/Loader1";
import {
  pmtableBtn,
  pmtableHeaders,
  pmtableKeys,
  pmtableName,
  pmtableReport,
  pmtableTHs,
} from "../assets/props/tableProps/pmtableProps";
import TooltipItem from "../components/tooltip/ToolTipItem";
import {
  fetchAllPurchases,
  purchaseCreate,
  purchaseDelete,
  purchaseUpdate,
} from "../controllers/purchase";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import NewPurchase from "../components/purchase/NewPurchase";
import EditPurchase from "../components/purchase/EditPurchase";
import DeletePurchase from "../components/purchase/DeletePurchase";
import { PDFViewer } from "@react-pdf/renderer";
import ExportPDF from "../components/table2/ExportPDF";

const PurchasePage = () => {
  const { purchases, setPurchases, fetching } = useContext(PurchasesContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);
  const [exportPDF, setExportPDF] = useState({
    status: false,
  });
  const dateFixedPurchases = purchases?.map((purchase) => {
    return {
      ...purchase,
      date: purchase.date.slice(0, 10).split("-").reverse().join("/"),
      total: purchase.rate * purchase.quantity,
    };
  });
  useEffect(() => {
    if (fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetching]);
  useEffect(() => {
    // Set focus on the "Delete" button when the delete modal opens
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [formState.status]);
  const reRender = async () => {
    try {
      setPurchases(await fetchAllPurchases());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating purchases:", error);
      toast.error("Error updating purchases");
    }
  };
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
  const onNewPurchase = () =>
    setFormState({
      status: "newPurchase",
      formData: {
        date: "",
        invoiceNo: "",
        supplierName: "",
        itemDescription: "",
        rate: "",
        quantity: "",
      },
    });
  // Function to handle delete confirmation
  const handleDeleteConfirmation = async (e, purchaseId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = purchases.find((pur) => pur._id === purchaseId);
      setFormState({ status: "deletePurchase", formData: res });
    } catch (error) {
      console.error("Error fetching purchase details:", error);
      throw error;
    } finally {
      setLoading(false); // Add this line to handle errors gracefully
    }
  };

  // Function to handle actual product deletion
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await toast.promise(purchaseDelete(formState.formData._id), {
        pending: "Deleting Purchase...",
        success: "Purchase deleted successfully! 👌",
        error: "Error deleting Purchase. Please try again. 🤯",
      });
      await reRender();
    } catch (err) {
      console.error("Error confirming delete:", err);
      toast.error("Error deleting purchase");
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel/delete without confirmation
  const cancelDelete = () => {
    setFormState({ status: "", formData: {} });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (formState.formData.rate < 0 || formState.formData.quantity < 0) {
        return toast.warn("No Negative value!");
      } else {
        await toast.promise(purchaseCreate(formState.formData), {
          pending: "Creating Purchase...",
          success: "Purchase created successfully! 👌",
          error: "Error creating Purchase. Please try again. 🤯",
        });
        await reRender();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding Purchase");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (formState.formData.retail < 0 || formState.formData.quantity < 0) {
        return toast.warn("No Negative value!");
      } else {
        await toast.promise(
          purchaseUpdate(formState.formData._id, formState.formData),
          {
            pending: "Editing Purchase...",
            success: "Purchase editied successfully! 👌",
            error: "Error editing Purchase. Please try again. 🤯",
          }
        );
        await reRender();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error editing purchase");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, purchaseId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = purchases.find((pur) => pur._id === purchaseId);
      setFormState({ status: "editPurchase", formData: res });
    } catch (error) {
      console.error("Error fetching purchase details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  const actions = [
    {
      button: (
        <TooltipItem position="top" tooltipsText="Edit">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mr-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
            <span className="material-icons text-sm">edit</span>
          </span>
        </TooltipItem>
      ),
      classNames: [],
      onSmash: onEdit,
    },
    {
      button: (
        <TooltipItem position="right" tooltipsText="Delete">
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/10">
            <span className="material-icons text-sm">delete</span>
          </span>
        </TooltipItem>
      ),
      classNames: [],
      onSmash: handleDeleteConfirmation,
    },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {exportPDF.status && (
        <Modal
          isOpen={exportPDF.status}
          onClose={() => setExportPDF({ status: false })}
          title={`Purchase Report PDF:`}
        >
          <div className="my-3">
            <PDFViewer width="1000" height="600">
              <ExportPDF
                exportData={dateFixedPurchases}
                headers={pmtableReport}
                title={"PURCHASE REPORT"}
              />
            </PDFViewer>
          </div>
        </Modal>
      )}
      {/* Confirmation Modal for Delete */}
      {formState.status === "deletePurchase" && (
        <Modal
          isOpen={formState.status === "deletePurchase"}
          onClose={cancelDelete}
          title={"Delete Purchase :"}
        >
          <DeletePurchase
            ref={focusRef}
            formData={formState.formData}
            setFormState={setFormState}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}

      {/* New Product Modal */}
      {formState.status === "newPurchase" && (
        <NewPurchase
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleSubmit}
        />
      )}
      {/* Edit Product Modal */}
      {formState.status === "editPurchase" && (
        <EditPurchase
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}
      <PageTitle pageName={"Purchase"}>
        <Table2Wrapper
          rows={dateFixedPurchases}
          tableName={pmtableName}
          tableBtn={pmtableBtn}
          onTableBtn={onNewPurchase}
          ths={pmtableTHs}
          actions={actions}
          mainKeys={pmtableKeys}
          filters={[]}
          exportData={dateFixedPurchases}
          headers={pmtableHeaders}
          onexportPDF={onexportPDF}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default PurchasePage;
