import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductsContext } from "../store/productContext";
import Loader1 from "../components/loaders/Loader1";
import {
  fetchAllProducts,
  fetchProductDetails,
  getProductSales,
  productCreate,
  productDelete,
  productUpdate,
} from "../controllers/products";
import NewProduct from "../components/product/NewProduct";
import { toast } from "react-toastify";
import {
  ptableBtn,
  ptableHeaders,
  ptableKeys,
  ptableName,
  ptableReport,
  ptableTHs,
} from "../assets/props/tableProps/ptableProps";
import EditProduct from "../components/product/EditProduct";
import Modal from "../components/modal/Modal";

import DeleteProduct from "../components/product/DeleteProduct";
import Newstock from "../components/stock/NewStock";
import { fetchAllStocks, stockCreate } from "../controllers/stock";
import { StockContext } from "../store/stockContext";
import PageTitle from "../components/pageTemp/PageTitle";
import Table2Wrapper from "../components/table2/Table2Wrapper";
import TooltipItem from "../components/tooltip/ToolTipItem";
import { PDFViewer } from "@react-pdf/renderer";
import ExportPDF from "../components/table2/ExportPDF";

const ProductPage = () => {
  const { products, setProducts, fetching } = useContext(ProductsContext);
  const [formState, setFormState] = useState({ status: "", formData: {} });
  const { setStocks } = useContext(StockContext);
  const [exportData, setExportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportPDF, setExportPDF] = useState({
    status: false,
  });
  const focusRef = useRef(null);
  const releventProducts = [
    ...products.filter((product) => !product.muted && !product.isLabour),
    ...products.filter((product) => !product.muted && product.isLabour),
    ...products.filter((product) => product.muted),
  ];

  useEffect(() => {
    if (fetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetching]);
  useEffect(() => {
    async function fetchProductSales() {
      setLoading(true);
      try {
        const res = await getProductSales();
        const exportReadyData = products.map((prod) => {
          const existproduct = res.find(
            (product) => product.productId === prod._id
          );
          if (!existproduct) {
            prod.retailQty = 0;
            prod.wholesaleQty = 0;
          } else {
            prod.retailQty = existproduct.retail;
            prod.wholesaleQty = existproduct.wholesale;
          }
          prod.retailSale = prod.retailPrice * prod.retailQty;
          prod.wholesaleSale = prod.wholesalePrice * prod.wholesaleQty;
          prod.totalQty = prod.retailQty + prod.wholesaleQty;
          prod.totalSales = prod.retailSale + prod.wholesaleSale;
          return prod;
        });
        setExportData(exportReadyData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductSales();
  }, [products]);
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

  const updateProducts = async () => {
    try {
      setProducts(await fetchAllProducts());
      setFormState({ status: "", formData: {} });
    } catch (error) {
      console.error("Error updating products:", error);
      toast.error("Error updating products");
    }
  };

  const onNewProd = () =>
    setFormState({
      status: "newProduct",
      formData: {
        productName: "",
        retailPrice: 0,
        wholesalePrice: 0,
        isLabour: false,
      },
    });
  // Function to handle delete confirmation
  const handleDeleteConfirmation = async (e, productId) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchProductDetails(productId);
      setFormState({ status: "deleteProduct", formData: res });
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    } finally {
      setLoading(false); // Add this line to handle errors gracefully
    }
  };

  // Function to handle actual product deletion
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await toast.promise(productDelete(formState.formData._id), {
        pending: "Deleting Product...",
        success: "Product deleted successfully! 👌",
        error: "Error deleting Product. Please try again. 🤯",
      });
      await updateProducts();
      setStocks(await fetchAllStocks());
    } catch (err) {
      console.error("Error confirming delete:", err);
      toast.error("Error deleting product");
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
      if (
        formState.formData.retailPrice < 0 ||
        formState.formData.wholesalePrice < 0
      ) {
        return toast.warn("No Negative value!");
      } else {
        await toast.promise(productCreate(formState.formData), {
          pending: "Creating Product...",
          success: "Product created successfully! 👌",
          error: "Error creating Product. Please try again. 🤯",
        });
        await updateProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(e, productId, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formState.formData.retailPrice < 0 ||
        formState.formData.wholesalePrice < 0
      ) {
        return toast.warn("No Negative value!");
      } else {
        await toast.promise(productUpdate(productId, formData), {
          pending: "Editing Product...",
          success: "Product editied successfully! 👌",
          error: "Error editing Product. Please try again. 🤯",
        });
        await updateProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error editing product");
    } finally {
      setLoading(false);
    }
  }
  async function onEdit(e, productId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchProductDetails(productId);
      if (res.muted) {
        return toast.info("Product is muted!");
      }
      setFormState({ status: "editProduct", formData: res });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }

  async function onAdd(e, productId) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetchProductDetails(productId);
      if (res.muted) {
        return toast.info("Product is muted!");
      }
      if (res.isLabour) {
        return toast.info("Product is Labour");
      }
      setFormState({
        status: "addStock",
        formData: {
          productId: res._id,
          productName: res.productName,
          addStock: "",
        },
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  }
  async function handleAddStock(e, formData) {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.addStock < 0) {
        return toast.warn("Negative stock value!");
      } else {
        await toast.promise(stockCreate(formData.productId, formData), {
          pending: "Adding Stock...",
          success: "Stock added successfully! 👌",
          error: "Error adding Stock. Please try again. 🤯",
        });

        await updateProducts();
        setStocks(await fetchAllStocks());
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const actions = [
    {
      button: (
        <TooltipItem position="top" tooltipsText="Add stock">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 mr-2 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-700/10">
            <span className="material-icons text-sm">add</span>
          </span>
        </TooltipItem>
      ),

      classNames: [],
      onSmash: onAdd,
    },
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
        <TooltipItem position="top" tooltipsText="Delete">
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-600/10">
            <span className="material-icons text-sm">delete</span>
          </span>
        </TooltipItem>
      ),
      classNames: [
        // "text-red-500",
        // " cursor-pointer",
        // " hover:text-red-700",
        // " transition",
      ],
      onSmash: handleDeleteConfirmation,
    },
  ];
  const filters = [
    {
      title: "High To Low",
      value: "HighToLow",
      onChecked: (rows) => {
        return rows.sort((a, b) => b.retailPrice - a.retailPrice);
      },
    },
    { title: "Low To High", value: "LowToHigh" },
  ];
  return (
    <>
      {loading && <Loader1 />}
      {exportPDF.status && (
        <Modal
          isOpen={exportPDF.status}
          onClose={() => setExportPDF({ status: false })}
          title={`Product Report PDF:`}
        >
          <div className="my-3">
            <PDFViewer width="1000" height="600">
              <ExportPDF
                exportData={exportData}
                headers={ptableReport}
                title={"PRODUCT REPORT"}
              />
            </PDFViewer>
          </div>
        </Modal>
      )}
      {/* Confirmation Modal for Delete */}
      {formState.status === "deleteProduct" && (
        <Modal
          isOpen={formState.status === "deleteProduct"}
          onClose={cancelDelete}
          title={"Delete Product :"}
        >
          <DeleteProduct
            ref={focusRef}
            formData={formState.formData}
            setFormState={setFormState}
            cancelDelete={cancelDelete}
            confirmDelete={confirmDelete}
          />
        </Modal>
      )}

      {/* New Product Modal */}
      {formState.status === "newProduct" && (
        <NewProduct
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleSubmit}
        />
      )}
      {/* Edit Product Modal */}
      {formState.status === "editProduct" && (
        <EditProduct
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleEdit}
        />
      )}
      {/* Add Stock Modal */}
      {formState.status === "addStock" && (
        <Newstock
          ref={focusRef}
          formState={formState}
          setFormState={setFormState}
          onSubmit={handleAddStock}
        />
      )}
      <PageTitle pageName={"Products"}>
        <Table2Wrapper
          rows={releventProducts}
          tableName={ptableName}
          tableBtn={ptableBtn}
          onTableBtn={onNewProd}
          ths={ptableTHs}
          actions={actions}
          mainKeys={ptableKeys}
          filters={filters}
          exportData={exportData}
          headers={ptableHeaders}
          onexportPDF={onexportPDF}
        ></Table2Wrapper>
      </PageTitle>
    </>
  );
};

export default ProductPage;
