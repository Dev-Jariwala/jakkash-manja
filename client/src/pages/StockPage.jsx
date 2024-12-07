import React, { useContext, useEffect, useRef, useState } from "react";
import { StockContext } from "../store/stockContext";
import {
  stableHeaders,
  stableKeys,
  stableName,
  stableTHs,
} from "../assets/props/tableProps/stableProps";
import Loader1 from "../components/loaders/Loader1";
import EditStock from "../components/stock/EditStock";
import {
  fetchAllStocks,
  fetchStockDetails,
  stockDelete,
  stockUpdate,
} from "../controllers/stock";
import { fetchAllProducts, fetchProductDetails } from "../controllers/products";
import { ProductsContext } from "../store/productContext";
import DeleteStock from "../components/stock/DeleteStock";
import Modal from "../components/modal/Modal";
import { toast } from "react-toastify";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";
import { PDFViewer } from "@react-pdf/renderer";
import ExportPDF from "../components/table2/ExportPDF";

const StockPage = () => {
  const { stocks, setStocks, fetching } = useContext(StockContext);
  const { products, setProducts } = useContext(ProductsContext);
  const [exportPDF, setExportPDF] = useState({
    status: false,
  });
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const [loading, setLoading] = useState(true);
  const focusRef = useRef(null);
  const dateFixedStocks = stocks?.map((stock) => {
    let muted = false;
    try {
      const curProduct = products.find(
        (product) => product._id === stock.productId
      );
      if (curProduct.muted) {
        muted = true;
      }
    } catch (error) {
      console.log(error);
    }
    return {
      ...stock,
      date: stock.date.slice(0, 10).split("-").reverse().join(" / "),
      muted,
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
  const cleanupFunc = async () => {
    try {
      setProducts(await fetchAllProducts());
      setStocks(await fetchAllStocks());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating products:", error);
      throw error;
    }
  };

  async function onEdit(e, stockId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchStockDetails(stockId);
      const curProduct = await fetchProductDetails(res.productId);
      if (curProduct.muted) {
        return toast.info("Product is muted!");
      }
      setFormState({ status: "editStock", formData: res });
    } catch (error) {
      console.error("Error fetching stock details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const curProduct = await fetchProductDetails(
        formState.formData.productId
      );

      const curStock = await fetchStockDetails(formState.formData._id);
      if (curStock.addStock - curProduct.stock > formState.formData.addStock) {
        return toast.warn("Stock Missing!");
      }
      if (formState.formData.addStock < 0) {
        return toast.warn("No Negative value!");
      } else {
        await toast.promise(
          stockUpdate(formState.formData._id, {
            addStock: formState.formData.addStock,
            date: formState.formData.date,
          }),
          {
            pending: "Editing Stock...",
            success: "Stock edited successfully! 👌",
            error: "Error editing Stock. Please try again. 🤯",
          }
        );
        await cleanupFunc();
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  async function onDelete(e, stockId) {
    e.preventDefault();
    setLoading(true);

    try {
      const curStock = await fetchStockDetails(stockId);
      const curProduct = await fetchProductDetails(curStock.productId);
      if (curProduct.muted) {
        return toast.info("Product is muted!");
      }
      if (curStock.addStock > curProduct.stock) {
        return toast.warn("Stock Missing!");
      }
      setFormState({ status: "deleteStock", formData: curStock });
    } catch (error) {
      console.error("Error fetching stock details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }

  // Function to handle actual product deletion
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await toast.promise(stockDelete(formState.formData._id), {
        pending: "Deleting Stock...",
        success: "Stock deleted successfully! 👌",
        error: "Error deleting Stock. Please try again. 🤯",
      });
      await cleanupFunc();
    } catch (err) {
      console.error("Error confirming delete:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel/delete without confirmation
  const cancelDelete = () => {
    setFormState({ status: "", formData: {} });
  };
  const actions = [
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 mr-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          <span className="material-icons text-sm">edit</span>
        </span>
      ),
      classNames: [],
      onSmash: onEdit,
    },
    {
      button: (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/10">
          <span className="material-icons text-sm">delete</span>
        </span>
      ),
      classNames: [],
      onSmash: onDelete,
    },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {exportPDF.status && (
        <Modal
          isOpen={exportPDF.status}
          onClose={() => setExportPDF({ status: false })}
          title={`Stock Report PDF:`}
        >
          <div className="my-3">
            <PDFViewer width="1000" height="600">
              <ExportPDF
                exportData={dateFixedStocks}
                headers={stableHeaders}
                title={"STOCK REPORT"}
              />
            </PDFViewer>
          </div>
        </Modal>
      )}
      {/* Edit Stock Modal */}
      {formState.status === "editStock" && (
        <EditStock
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}
      {/* Delete Modal */}
      {formState.status === "deleteStock" && (
        <Modal
          isOpen={formState.status === "deleteStock"}
          onClose={cancelDelete}
          title={"Delete Stock :"}
        >
          <DeleteStock
            ref={focusRef}
            formData={formState.formData}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}
      <PageTitle pageName={"Stocks"}>
        <Table2Wrapper
          rows={dateFixedStocks}
          tableName={stableName}
          ths={stableTHs}
          actions={actions}
          mainKeys={stableKeys}
          exportData={dateFixedStocks}
          headers={stableHeaders}
          onexportPDF={onexportPDF}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default StockPage;
