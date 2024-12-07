import React, { forwardRef } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import { preventScrollInNumber } from "../../assets/helper";

const EditProduct = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  return (
    <Modal
      isOpen={formState.status === "editProduct"}
      onClose={() => setFormState({ status: "", formData: {} })}
      title={"Edit Product : "}
    >
      <div className="pt-3 px-3">
        <form
          className="max-w-md mx-auto my-4"
          onSubmit={(e) =>
            onSubmit(e, formState.formData._id, {
              productName: formState.formData.productName,
              retailPrice: formState.formData.retailPrice,
              wholesalePrice: formState.formData.wholesalePrice,
              isLabour: formState.formData.isLabour,
            })
          }
        >
          {/* Product Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="ep-pName"
              type="text"
              ref={ref}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formState.formData.productName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  formData: {
                    ...prev.formData,
                    productName: String(e.target.value),
                  },
                }))
              }
              required
            />
            <label
              htmlFor="ep-pName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Name
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            {/* Retail Price */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="ep-rPrice"
                type="number"
                onFocus={preventScrollInNumber}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.retailPrice}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      retailPrice: parseFloat(e.target.value)
                        ? parseFloat(e.target.value)
                        : "",
                    },
                  }));
                }}
                required
              />
              <label
                htmlFor="ep-rPrice"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Retail Price
              </label>
            </div>
            {/* WholesalePrice */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="ep-wPrice"
                type="number"
                onFocus={preventScrollInNumber}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.wholesalePrice}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      wholesalePrice:
                        parseFloat(e.target.value) >= 0
                          ? parseFloat(e.target.value)
                          : "",
                    },
                  }))
                }
                required
              />
              <label
                htmlFor="ep-wPrice"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Wholesale Price
              </label>
            </div>
          </div>
          {/* Stock */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="ep-stock"
              type="text"
              placeholder=" "
              className="block py-2.5 px-0 rounded-lg w-full text-sm bg-gray-200 opacity-50 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              disabled
            />
            <label
              htmlFor="ep-stock"
              className="peer-focus:font-medium pl-3  absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Stock = {formState.formData.stock}
            </label>

            <div
              className="bg-yellow-50 mt-2 border border-yellow-200 text-sm text-yellow-600 rounded-lg p-4 dark:bg-white/[.05] dark:border-white/10 dark:text-gray-400"
              role="alert"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="flex-shrink-0 h-4 w-4 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <div className="flex-1 md:flex md:justify-between ms-2">
                  <p className="text-sm">
                    Stock is{" "}
                    <span className="font-semibold">uneditable directly</span>,
                    for corrections, use the{" "}
                    <Link
                      to={"/stocks"}
                      className="font-semibold underline hover:no-underline"
                    >
                      Stock table
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* isLabour */}
          <div className="relative z-0 w-full mb-5 group">
            <div
              className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 "
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">
                  Set product as <span className="font-semibold">Labour</span>.
                </span>
                <ul className="mt-1.5 list-disc list-inside text-xs text-justify">
                  <li>Labour products will appear at bottom of bill.</li>
                  <li>Labour products does not require stocks to be added.</li>
                </ul>
                {/* Toggle button to mute or unmute product */}
                <label className="relative inline-flex items-center cursor-pointer mt-3">
                  <input
                    id="np-isLabour"
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={() =>
                      setFormState((prev) => {
                        return {
                          ...prev,
                          formData: {
                            ...prev.formData,
                            isLabour: !prev.formData.isLabour,
                          },
                        };
                      })
                    }
                    checked={formState.formData.isLabour}
                  />
                  <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-blue-800 ">
                    {formState.formData.isLabour ? "Labour" : "Product"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default EditProduct;
