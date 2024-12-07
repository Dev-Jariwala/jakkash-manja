import React, { forwardRef, useContext, useState } from "react";
import { ProductsContext } from "../../store/productContext";
import { toast } from "react-toastify";
import { preventScrollInNumber } from "../../assets/helper";
import { fetchAllProducts } from "../../controllers/products";
import { fetchAllStocks, stockCreate } from "../../controllers/stock";
import { StockContext } from "../../store/stockContext";

const EditWholeSale = forwardRef(
  ({ formData, setFormState, onSubmit }, ref) => {
    const { products, setProducts } = useContext(ProductsContext);
    const { setStocks } = useContext(StockContext);
    const [billProducts, setBillProducts] = useState(formData.products);
    const releventProducts = products.filter(
      (prod) =>
        (prod.wholesalePrice > 0 && !prod.muted) ||
        (prod.muted &&
          billProducts.some(
            (billProduct) =>
              billProduct.productId === prod._id && billProduct.quantity > 0
          ))
    );
    return (
      <div className="pt-3 px-3">
        <form
          className="my-4"
          onSubmit={(e) => onSubmit(e, formData._id, formData)}
        >
          <div className="grid md:grid-cols-5 md:gap-6">
            {/* Bill NO. */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full cursor-not-allowed text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                disabled
              />
              <label className="peer-focus:font-medium pl-3   absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                {`Bill No. ${formData.BillNo}`}
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-3 md:gap-6">
            {/* Mobile No. */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="nr-mobile"
                type="tel"
                list="mobileNumbers"
                // maxLength={"10"}
                minLength={"10"}
                onFocus={(e) =>
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    { passive: false }
                  )
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                ref={ref}
                value={formData.mobileNumber}
                onChange={(e) => {
                  if (
                    e.target.value.length < 10 &&
                    e.target.value.length >= 0
                  ) {
                    document.getElementById("nr-mobile").style.borderColor =
                      "red";
                  } else {
                    document.getElementById("nr-mobile").style.borderColor =
                      "green";
                  }
                  if (e.target.value.length > 10) {
                    return alert("Max 10 Digit Allowed!");
                  }
                  setFormState((prev) => {
                    return {
                      ...prev,
                      formData: {
                        ...prev.formData,
                        mobileNumber:
                          parseInt(e.target.value) >= 0
                            ? parseInt(e.target.value)
                            : "",
                      },
                    };
                  });
                }}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Mobile Number
              </label>
              <datalist id="mobileNumbers">
                <option value="7990176865">7990176865</option>
                <option value="9925828460">9925828460</option>
              </datalist>
            </div>
            {/* Name */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.name}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      formData: {
                        ...prev.formData,
                        name: String(e.target.value),
                      },
                    };
                  })
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Name:
              </label>
            </div>
            {/* Address */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.address}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      formData: {
                        ...prev.formData,
                        address: String(e.target.value),
                      },
                    };
                  })
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Address:
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-3 md:gap-6 mb-2">
            {/* orderDate */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.orderDate.slice(0, 10)}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      formData: { ...prev.formData, orderDate: e.target.value },
                    };
                  })
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Date:
              </label>
            </div>
            {/* Delivery Date */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formData.deliveryDate.slice(0, 10)}
                onChange={(e) =>
                  setFormState((prev) => {
                    return {
                      ...prev,
                      formData: {
                        ...prev.formData,
                        deliveryDate: e.target.value,
                      },
                    };
                  })
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Delivery Date:
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Rate
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Products */}
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">
                    {" "}
                    <span className="text-l text-gray-700 font-bold">
                      Products:
                    </span>{" "}
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                </tr>
                {releventProducts
                  .filter((prod) => !prod.isLabour)
                  .map((prod) => {
                    let currProduct = formData.products.filter((product) => {
                      return product.productId === prod._id;
                    });
                    let orignalProduct = billProducts.filter((product) => {
                      return product.productId === prod._id;
                    });
                    const originalQuantity = orignalProduct[0]?.quantity || 0;
                    return (
                      <tr
                        key={prod._id}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="px-4 py-3">
                          <div className="flex">
                            <button
                              disabled
                              className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {prod.productName}
                            </button>
                            {/* Add Stock Button */}

                            {!prod.isLabour && (
                              <button
                                tabIndex={`-1`}
                                className="block w-10 p-1 ml-1 text-black font-semibold border-2 border-gray-300 rounded-lg bg-gray-100  sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onClick={async (e) => {
                                  e.preventDefault();

                                  const addStock = Number(
                                    prompt(
                                      `Add Stock in "${prod.productName}": `
                                    )
                                  );

                                  try {
                                    if (
                                      !addStock ||
                                      isNaN(addStock) ||
                                      addStock < 0
                                    ) {
                                      return toast.warn("Invalid stock value!");
                                    } else {
                                      await toast.promise(
                                        stockCreate(prod._id, {
                                          productId: prod._id,
                                          productName: prod.productName,
                                          addStock: Number(addStock),
                                        }),
                                        {
                                          pending: "Adding Stock...",
                                          success:
                                            "Stock added successfully! 👌",
                                          error:
                                            "Error adding Stock. Please try again. 🤯",
                                        }
                                      );

                                      setProducts(await fetchAllProducts());
                                      setStocks(await fetchAllStocks());
                                    }
                                  } catch (error) {
                                    console.log(error);
                                    throw error;
                                  }
                                }}
                              >
                                +
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {" "}
                          <input
                            type="text"
                            className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={prod.isLabour ? "unlimited" : prod.stock}
                            disabled
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={prod.wholesalePrice}
                            disabled
                          />
                        </td>
                        <td>
                          {prod.stock <= 0 &&
                          originalQuantity <= 0 &&
                          !prod.isLabour ? (
                            <input
                              style={{ textAlign: "center" }}
                              type="text"
                              className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={"Out of Stock"}
                              disabled
                            />
                          ) : (
                            <input
                              type="text"
                              onFocus={(e) =>
                                e.target.addEventListener(
                                  "wheel",
                                  function (e) {
                                    e.preventDefault();
                                  },
                                  { passive: false }
                                )
                              }
                              placeholder="Qty"
                              value={currProduct[0]?.quantity || 0}
                              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={(e) => {
                                const newQty =
                                  parseInt(e.target.value) >= 0
                                    ? parseInt(e.target.value)
                                    : 0;
                                setFormState((prev) => {
                                  const updatedProducts =
                                    prev.formData.products.map((product) => {
                                      if (product.productId === prod._id) {
                                        if (
                                          (prod.stock <= 0 &&
                                            originalQuantity > 0 &&
                                            newQty <= originalQuantity) ||
                                          (prod.stock > 0 &&
                                            originalQuantity > 0 &&
                                            newQty <=
                                              originalQuantity + prod.stock) ||
                                          newQty <= prod.stock ||
                                          prod.isLabour
                                        ) {
                                          return {
                                            ...product,
                                            quantity: newQty,
                                          };
                                        } else {
                                          toast.warn("Insufficiant Stock");
                                          alert("Insufficient stock!");
                                          return {
                                            ...product,
                                            quantity: "",
                                          };
                                        }
                                      }
                                      return product;
                                    });

                                  const existingProduct = updatedProducts.find(
                                    (product) => product.productId === prod._id
                                  );
                                  if (!existingProduct) {
                                    updatedProducts.push({
                                      productId: prod._id,
                                      productName: prod.productName,
                                      price: prod.wholesalePrice,
                                      quantity: newQty,
                                    });
                                  }
                                  let calculateValue = updatedProducts.reduce(
                                    (acc, curr) =>
                                      acc + curr.price * curr.quantity,
                                    0
                                  );
                                  const filteredProducts =
                                    updatedProducts.filter(
                                      (product) => product.quantity > 0
                                    );
                                  return {
                                    ...prev,
                                    formData: {
                                      ...prev.formData,
                                      products: filteredProducts,
                                      subTotal: calculateValue,
                                      totalDue:
                                        calculateValue -
                                        prev.formData.discount -
                                        prev.formData.advance -
                                        prev.formData.paid,
                                    },
                                  };
                                });
                              }}
                            />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {" "}
                          <input
                            type="number"
                            className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Total"
                            value={
                              prod.wholesalePrice *
                                formData.products.find(
                                  (p) => p.productId === prod._id
                                )?.quantity || 0
                            }
                            disabled
                          />
                        </td>
                      </tr>
                    );
                  })}
                {/* Labours */}
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">
                    {" "}
                    <span className="text-l text-gray-700 font-bold">
                      Labours:
                    </span>{" "}
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                </tr>
                {releventProducts
                  .filter((prod) => prod.isLabour)
                  .map((prod) => {
                    let currProduct = formData.products.filter((product) => {
                      return product.productId === prod._id;
                    });
                    let orignalProduct = billProducts.filter((product) => {
                      return product.productId === prod._id;
                    });
                    const originalQuantity = orignalProduct[0]?.quantity || 0;
                    return (
                      <tr
                        key={prod._id}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="px-4 py-3">
                          <div className="flex">
                            <button
                              disabled
                              className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {prod.productName}
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {" "}
                          <input
                            type="text"
                            className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={prod.isLabour ? "unlimited" : prod.stock}
                            disabled
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={prod.wholesalePrice}
                            disabled
                          />
                        </td>
                        <td>
                          {prod.stock <= 0 &&
                          originalQuantity <= 0 &&
                          !prod.isLabour ? (
                            <input
                              style={{ textAlign: "center" }}
                              type="text"
                              className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={"Out of Stock"}
                              disabled
                            />
                          ) : (
                            <input
                              type="text"
                              onFocus={(e) =>
                                e.target.addEventListener(
                                  "wheel",
                                  function (e) {
                                    e.preventDefault();
                                  },
                                  { passive: false }
                                )
                              }
                              placeholder="Qty"
                              value={currProduct[0]?.quantity || 0}
                              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              onChange={(e) => {
                                const newQty =
                                  parseInt(e.target.value) >= 0
                                    ? parseInt(e.target.value)
                                    : 0;
                                setFormState((prev) => {
                                  const updatedProducts =
                                    prev.formData.products.map((product) => {
                                      if (product.productId === prod._id) {
                                        if (
                                          (prod.stock <= 0 &&
                                            originalQuantity > 0 &&
                                            newQty <= originalQuantity) ||
                                          (prod.stock > 0 &&
                                            originalQuantity > 0 &&
                                            newQty <=
                                              originalQuantity + prod.stock) ||
                                          newQty <= prod.stock ||
                                          prod.isLabour
                                        ) {
                                          return {
                                            ...product,
                                            quantity: newQty,
                                          };
                                        } else {
                                          toast.warn("Insufficiant Stock");
                                          alert("Insufficient stock!");
                                          return {
                                            ...product,
                                            quantity: "",
                                          };
                                        }
                                      }
                                      return product;
                                    });

                                  const existingProduct = updatedProducts.find(
                                    (product) => product.productId === prod._id
                                  );
                                  if (!existingProduct) {
                                    updatedProducts.push({
                                      productId: prod._id,
                                      productName: prod.productName,
                                      price: prod.wholesalePrice,
                                      quantity: newQty,
                                    });
                                  }
                                  let calculateValue = updatedProducts.reduce(
                                    (acc, curr) =>
                                      acc + curr.price * curr.quantity,
                                    0
                                  );
                                  const filteredProducts =
                                    updatedProducts.filter(
                                      (product) => product.quantity > 0
                                    );
                                  return {
                                    ...prev,
                                    formData: {
                                      ...prev.formData,
                                      products: filteredProducts,
                                      subTotal: calculateValue,
                                      totalDue:
                                        calculateValue -
                                        prev.formData.discount -
                                        prev.formData.advance -
                                        prev.formData.paid,
                                    },
                                  };
                                });
                              }}
                            />
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {" "}
                          <input
                            type="number"
                            className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Total"
                            value={
                              prod.wholesalePrice *
                                formData.products.find(
                                  (p) => p.productId === prod._id
                                )?.quantity || 0
                            }
                            disabled
                          />
                        </td>
                      </tr>
                    );
                  })}
                <tr>
                  <td className="px-4 py-3" colSpan={"3"}>
                    <label
                      for="notes"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your notes
                    </label>
                    <textarea
                      tabIndex={"-1"}
                      id="notes"
                      rows="4"
                      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write your thoughts here..."
                      value={formData.notes || ""}
                      onChange={(e) =>
                        setFormState((prev) => {
                          return {
                            ...prev,
                            formData: {
                              ...prev.formData,
                              notes: e.target.value,
                            },
                          };
                        })
                      }
                    ></textarea>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        let totalQty = formData.products.reduce(
                          (acc, curr) => acc + curr.quantity,
                          0
                        );
                        setFormState((prev) => {
                          return {
                            ...prev,
                            formData: {
                              ...prev.formData,
                              totalFirki: parseInt(totalQty),
                            },
                          };
                        });
                      }}
                      className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Calculate
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <label>
                      Total Firki
                      <input
                        type="number"
                        onFocus={(e) =>
                          e.target.addEventListener(
                            "wheel",
                            function (e) {
                              e.preventDefault();
                            },
                            { passive: false }
                          )
                        }
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.totalFirki}
                        onChange={(e) => {
                          setFormState((prev) => {
                            return {
                              ...prev,
                              formData: {
                                ...prev.formData,
                                totalFirki:
                                  parseInt(e.target.value) >= 0
                                    ? parseInt(e.target.value)
                                    : "",
                              },
                            };
                          });
                        }}
                        required
                      />
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <label>
                      Sub Total
                      <input
                        type="number"
                        onFocus={(e) =>
                          e.target.addEventListener(
                            "wheel",
                            function (e) {
                              e.preventDefault();
                            },
                            { passive: false }
                          )
                        }
                        className="block w-full p-2 text-black font-semibold opacity-50 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.subTotal}
                        disabled
                      />
                    </label>
                  </td>
                </tr>
                {/* Discount */}
                <tr>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <label>
                      Discount
                      <input
                        type="text"
                        onFocus={(e) =>
                          e.target.addEventListener(
                            "wheel",
                            function (e) {
                              e.preventDefault();
                            },
                            { passive: false }
                          )
                        }
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.discount || 0}
                        onChange={(e) => {
                          setFormState((prev) => {
                            const constSubTotal = parseFloat(
                              prev.formData.products.reduce(
                                (acc, curr) => acc + curr.price * curr.quantity,
                                0
                              )
                            );
                            const enteredDiscount =
                              parseFloat(e.target.value) >= 0
                                ? parseFloat(e.target.value)
                                : 0;

                            // Ensure discount is not greater than available amount
                            const maxDiscount =
                              constSubTotal -
                              prev.formData.advance -
                              prev.formData.paid;

                            const validDiscount =
                              enteredDiscount <= maxDiscount
                                ? enteredDiscount
                                : 0;
                            if (enteredDiscount > maxDiscount) {
                              toast.warn("Incorrect!");
                            }
                            return {
                              ...prev,
                              formData: {
                                ...prev.formData,
                                discount: validDiscount,

                                // Adjust totalDue considering the entered discount
                                totalDue:
                                  constSubTotal -
                                  validDiscount -
                                  prev.formData.advance -
                                  prev.formData.paid,
                              },
                            };
                          });
                        }}
                        required
                      />
                    </label>
                  </td>
                </tr>
                {/* Advance */}
                <tr>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <label>
                      Advance
                      <input
                        type="text"
                        onFocus={(e) =>
                          e.target.addEventListener(
                            "wheel",
                            function (e) {
                              e.preventDefault();
                            },
                            { passive: false }
                          )
                        }
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.advance || 0}
                        onChange={(e) => {
                          const enteredAdvance =
                            parseInt(e.target.value) >= 0
                              ? parseInt(e.target.value)
                              : 0;

                          // Ensure advance is not greater than available amount
                          const maxAdvance =
                            formData.subTotal -
                            formData.discount -
                            formData.paid;

                          const validAdvance =
                            enteredAdvance <= maxAdvance ? enteredAdvance : 0;
                          if (enteredAdvance > maxAdvance) {
                            toast.warn("Incorrect!");
                          }
                          setFormState((prev) => {
                            return {
                              ...prev,
                              formData: {
                                ...prev.formData,
                                advance: validAdvance,
                                totalDue:
                                  formData.subTotal -
                                  formData.discount -
                                  validAdvance -
                                  formData.paid,
                              },
                            };
                          });
                        }}
                        required
                      />
                    </label>
                  </td>
                </tr>
                {/* paid */}
                <tr>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <label>
                      Paid
                      <input
                        type="text"
                        onFocus={(e) =>
                          e.target.addEventListener(
                            "wheel",
                            function (e) {
                              e.preventDefault();
                            },
                            { passive: false }
                          )
                        }
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={formData.paid || 0}
                        onChange={(e) => {
                          const enteredPaid =
                            parseInt(e.target.value) > 0
                              ? parseInt(e.target.value)
                              : 0;

                          // Ensure advance is not greater than available amount
                          const maxPaid =
                            formData.subTotal -
                            formData.discount -
                            formData.advance;

                          const validPaid =
                            enteredPaid <= maxPaid ? enteredPaid : 0;
                          if (enteredPaid > maxPaid) {
                            toast.warn("Incorrect!");
                          }
                          setFormState((prev) => {
                            return {
                              ...prev,
                              formData: {
                                ...prev.formData,
                                paid: validPaid,
                                totalDue:
                                  formData.subTotal -
                                  formData.discount -
                                  formData.advance -
                                  validPaid,
                              },
                            };
                          });
                        }}
                        required
                      />
                    </label>
                  </td>
                </tr>
                {/* Total due */}
                <tr>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <label>
                      Total Due
                      <input
                        className="block w-full p-2 text-black font-semibold border-2 opacity-50 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        onFocus={(e) =>
                          e.target.addEventListener(
                            "wheel",
                            function (e) {
                              e.preventDefault();
                            },
                            { passive: false }
                          )
                        }
                        value={formData.totalDue}
                        disabled
                        // required
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Save Bill No. {formData.BillNo}
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default EditWholeSale;
