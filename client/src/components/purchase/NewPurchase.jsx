import React, { forwardRef } from "react";
import Modal from "../modal/Modal";
import { preventScrollInNumber } from "../../assets/helper";

const NewPurchase = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  return (
    <Modal
      isOpen={formState.status === "newPurchase"}
      onClose={() => setFormState({ status: "", formData: {} })}
      title={"New Purchase :"}
    >
      <div className="pt-3 px-3">
        <form className="max-w-md mx-auto my-4" onSubmit={(e) => onSubmit(e)}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              ref={ref}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formState.formData.invoiceNo}
              onChange={(e) => {
                setFormState((prev) => ({
                  ...prev,
                  formData: {
                    ...prev.formData,
                    invoiceNo: e.target.value,
                  },
                }));
              }}
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Invoice No.
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formState.formData.supplierName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  formData: {
                    ...prev.formData,
                    supplierName: e.target.value,
                  },
                }))
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Supplier Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formState.formData.itemDescription}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  formData: {
                    ...prev.formData,
                    itemDescription: e.target.value,
                  },
                }))
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Description
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                onFocus={preventScrollInNumber}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.rate}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      rate:
                        parseFloat(e.target.value) >= 0
                          ? parseFloat(e.target.value)
                          : "",
                    },
                  }))
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Rate
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                onFocus={preventScrollInNumber}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.quantity}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      quantity:
                        parseFloat(e.target.value) >= 0
                          ? parseFloat(e.target.value)
                          : "",
                    },
                  }))
                }
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Quantity
              </label>
            </div>
          </div>
          {/* Date */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={formState.formData.date}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  formData: {
                    ...prev.formData,
                    date: e.target.value,
                  },
                }))
              }
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Date
            </label>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create product
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default NewPurchase;
