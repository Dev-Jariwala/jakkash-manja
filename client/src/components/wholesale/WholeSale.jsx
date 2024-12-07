import React, { useContext, useEffect, useRef, useState } from "react";
import Loader1 from "../loaders/Loader1";
import Modal from "../modal/Modal";
import { toast } from "react-toastify";
import { ProductsContext } from "../../store/productContext";
import { StockContext } from "../../store/stockContext";
import { fetchAllStocks } from "../../controllers/stock";
import { fetchAllProducts } from "../../controllers/products";
import { PDFViewer } from "@react-pdf/renderer";
import { WholeSaleContext } from "../../store/wholeSaleBillContext";
import {
  fetchAllWholeSaleBills,
  updateTotalDue,
  wholeSaleBillCreate,
  wholeSaleBillUpdate,
} from "../../controllers/wholeSale";
import {
  wbtableBtn,
  wbtableHeaders,
  wbtableKeys,
  wbtableName,
  wbtableReport,
  wbtableTHs,
} from "../../assets/props/tableProps/wbtableProps";
import NewWholeSale from "./NewWholeSale";
import EditWholeSale from "./EditWholeSale";
import { fetchAllClients } from "../../controllers/client";
import { ClientContext } from "../../store/clientContext";
import Table2Wrapper from "../table2/Table2Wrapper";
import BillPDF from "../bill-pdf/BillPDF";
import ExportPDF from "../table2/ExportPDF";
import PayBill from "../retail/PayBill";
import BillReport from "../retail/BillReport";
import BillPDF2 from "../bill-pdf/BillPDF2";

const WholeSale = () => {
  const { wholeSaleBills, setWholeSaleBills, fetching } =
    useContext(WholeSaleContext);
  const { setProducts } = useContext(ProductsContext);
  const { setStocks } = useContext(StockContext);
  const { setClients } = useContext(ClientContext);
  const initialRetail = {
    BillNo: wholeSaleBills.length + 1,
    orderDate: "",
    name: "",
    address: "",
    mobileNumber: "",
    deliveryDate: "",
    products: [],
    totalFirki: "",
    subTotal: 0,
    discount: 0,
    advance: 0,
    totalDue: 0,
    notes: "",
  };
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [showPDF, setShowPDF] = useState({ status: false, bill: {} });
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);
  const [exportPDF, setExportPDF] = useState({
    status: false,
  });
  const exportData = wholeSaleBills?.map((bill) => {
    return {
      ...bill,
      orderDate: bill.orderDate.slice(0, 10).split("-").reverse().join("/"),
      deliveryDate: bill.deliveryDate
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/"),
    };
  });
  const dateFixedBills = exportData?.map((bill) => {
    return {
      ...bill,
      totalDue: (
        <span
          className={`inline-flex cursor-pointer items-center rounded-md px-2 py-1 text-xs font-medium ${
            bill.totalDue > 0
              ? "bg-red-50 text-red-700  ring-red-600/10"
              : "bg-green-100 text-green-700 ring-green-600/20"
          } ring-1 ring-inset`}
          onClick={() => {
            if (bill.totalDue > 0) {
              setFormState({ status: "payBill", formData: bill });
            } else {
              toast.info("Bill Already Paid!");
            }
          }}
        >
          {bill.totalDue > 0 ? bill.totalDue : "Paid"}
        </span>
      ),
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
  const reRenderData = async () => {
    try {
      setWholeSaleBills(await fetchAllWholeSaleBills());
      setProducts(await fetchAllProducts());
      setStocks(await fetchAllStocks());
      setClients(await fetchAllClients());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error fetching Retail Bills:", error);
      toast.error("Error fetching retail bills");
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
  const onNewWholeSale = () =>
    setFormState({
      status: "newWholesale",
      formData: { ...initialRetail },
    });
  const onShowPDF = (e, billId) => {
    setLoading(true);
    try {
      const bill = wholeSaleBills.find((bill) => bill._id === billId);
      setShowPDF({
        status: true,
        bill,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (formState.formData.totalDue < 0) {
        return toast.warn("TotalDue negative!");
      }
      await toast.promise(wholeSaleBillCreate(formState.formData), {
        pending: "Creating Bill...",
        success: "Bill created successfully! 👌",
        error: "Error creating Bill. Please try again. 🤯",
      });
      setShowPDF({ status: true, bill: formState.formData });
      await reRenderData();
    } catch (error) {
      console.log(error);
      toast.error("Error creating wholesalebill");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e, billId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.totalDue < 0) {
        return toast.warn("TotalDue negative!");
      }
      await toast.promise(wholeSaleBillUpdate(billId, formData), {
        pending: "Editing Bill...",
        success: "Bill editied successfully! 👌",
        error: "Error editing Bill. Please try again. 🤯",
      });
      await reRenderData();
    } catch (error) {
      console.log(error);
      toast.error("Error editing Bill");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, billId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = wholeSaleBills.find((bill) => bill._id === billId);
      setFormState({ status: "editRetail", formData: res });
    } catch (error) {
      console.error("Error fetching bill details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  // Function to cancel/delete without confirmation
  const canclePay = () => {
    setFormState({ status: "", formData: {} });
  };
  // Function to handle actual product deletion
  const confirmPay = async () => {
    setLoading(true);
    try {
      await toast.promise(updateTotalDue(formState.formData._id), {
        pending: "Paying bill...",
        success: "Paid bill successfully! 👌",
        error: "Error paying bill. Please try again. 🤯",
      });
      await reRenderData();
    } catch (err) {
      console.error("Error confirming delete:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const actions = [
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mr-2 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-700/10">
          <span className="material-icons text-sm">visibility</span>
        </span>
      ),

      classNames: [],
      onSmash: onShowPDF,
    },
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mr-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          <span className="material-icons text-sm">edit</span>
        </span>
      ),
      classNames: [],
      onSmash: onEdit,
    },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {exportPDF.status && (
        <Modal
          isOpen={exportPDF.status}
          onClose={() => setExportPDF({ status: false })}
          title={`Wholesale Report PDF:`}
        >
          <BillReport
            exportData={exportData}
            headers={wbtableReport}
            title={"WHOLESALE REPORT"}
          />
        </Modal>
      )}
      {showPDF.status && (
        <Modal
          isOpen={showPDF.status}
          onClose={() => setShowPDF({ status: false, bill: {} })}
          title={"View Wholesale Bill PDF :"}
        >
          <div className="my-3">
            <BillPDF2 bill={showPDF.bill} />
          </div>
        </Modal>
      )}
      {/* pay Modal */}
      {formState.status === "payBill" && (
        <Modal
          isOpen={formState.status === "payBill"}
          onClose={canclePay}
          title={"Mark Paid :"}
        >
          <PayBill
            ref={focusRef}
            formData={formState.formData}
            canclePay={canclePay}
            confirmPay={confirmPay}
          />
        </Modal>
      )}
      <div className="bills">
        {formState.status === "newWholesale" && (
          <Modal
            isOpen={formState.status === "newWholesale"}
            onClose={() => setFormState({ status: "", formData: {} })}
            title={"New Wholesale Bill :"}
          >
            <NewWholeSale
              formState={formState}
              setFormState={setFormState}
              onSubmit={handleSubmit}
              ref={focusRef}
            />
          </Modal>
        )}
        {formState.status === "editRetail" && (
          <Modal
            isOpen={formState.status === "editRetail"}
            onClose={() => setFormState({ status: "", formData: {} })}
            title={"Edit Wholesale Bill :"}
          >
            <EditWholeSale
              formData={formState.formData}
              setFormState={setFormState}
              onSubmit={handleEdit}
              ref={focusRef}
            />
          </Modal>
        )}
      </div>
      <Table2Wrapper
        showIndex={false}
        rows={dateFixedBills}
        tableName={wbtableName}
        tableBtn={wbtableBtn}
        onTableBtn={onNewWholeSale}
        ths={wbtableTHs}
        actions={actions}
        headers={wbtableHeaders}
        mainKeys={wbtableKeys}
        exportData={exportData}
        onexportPDF={onexportPDF}
      ></Table2Wrapper>
    </>
  );
};

export default WholeSale;
