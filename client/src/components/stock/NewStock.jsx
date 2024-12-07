import React, { forwardRef } from "react";
import Modal from "../modal/Modal";
import { preventScrollInNumber } from "../../assets/helper";

const Newstock = forwardRef(({ formState, setFormState, onSubmit }, ref) => {
  return (
    <Modal
      isOpen={formState.status === "addStock"}
      onClose={() => setFormState({ status: "", formData: {} })}
      title={"Add Stock"}
    >
      <div className="pt-3 px-3">
        <form
          className="max-w-md mx-auto my-4"
          onSubmit={(e) => onSubmit(e, formState.formData)}
        >
          <div className="relative z-0 w-full mb-7 group">
            <input
              type="text"
              placeholder=" "
              className="block py-2.5 px-0 rounded-lg w-full text-sm bg-gray-300 opacity-50 text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              disabled
            />
            <label className="peer-focus:font-medium pl-3  absolute text-sm text-gray-500 font-bold dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              {formState.formData.productName}
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                ref={ref}
                type="number"
                onFocus={preventScrollInNumber}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={formState.formData.addStock}
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      addStock: parseInt(e.target.value)
                        ? parseInt(e.target.value)
                        : "",
                    },
                  }));
                }}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Stock:
              </label>
            </div>
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
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Date:
              </label>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Stock
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default Newstock;
