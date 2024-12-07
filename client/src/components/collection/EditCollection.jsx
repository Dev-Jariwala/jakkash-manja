import React, { forwardRef, useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { CollectionContext } from "../../store/collectionContext";

const EditCollection = forwardRef(
  ({ formState, setFormState, onSubmit }, ref) => {
    const { activeColl, collections } = useContext(CollectionContext);
    const [valid, setValid] = useState(undefined);
    useEffect(() => {
      const found = collections.find(
        (coll) =>
          coll.collectionName === formState.formData.collectionName &&
          coll._id !== formState.formData._id
      );
      if (found && formState.formData.collectionName.length > 0) {
        setValid("error");
      } else if (!found && formState.formData.collectionName.length > 0) {
        setValid("success");
      } else {
        setValid(undefined);
      }
    }, [formState.formData.collectionName]);
    return (
      <Modal
        isOpen={formState.status === "editCollection"}
        onClose={() => setFormState({ status: "", formData: {} })}
        title={"Edit Collection :"}
      >
        <div className="px-4 pt-3">
          <form
            onSubmit={(e) =>
              onSubmit(e, formState.formData._id, {
                collectionName: formState.formData.collectionName,
              })
            }
          >
            <div className="mb-6">
              <label
                className={`block mb-2 text-sm font-medium dark:text-gray-300
                ${valid === "error" && " text-red-500 dark:text-red-500"}
                 `}
              >
                Collection Name
              </label>
              <input
                type="text"
                ref={ref}
                className={`${
                  valid === "success"
                    ? " border border-green-500 text-gray-800 dark:text-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
                    : valid === "error"
                    ? "bg-red-50 border border-red-500 text-red-900 text-sm rounded-lg focus:ring-red-200 dark:focus:ring-red-600 dark:bg-gray-700 focus:border-red-600 block w-full p-2.5 dark:text-red-500  dark:border-red-500"
                    : "border text-sm rounded-lg  block w-full p-2.5"
                }`}
                placeholder=""
                value={formState.formData.collectionName}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    formData: {
                      ...prev.formData,
                      collectionName: String(e.target.value),
                    },
                  }))
                }
                required
              />
              {formState.formData.collectionName && (
                <p
                  className={`mt-2 text-sm ${
                    valid === "error" && "text-red-500 dark:text-red-500"
                  }`}
                >
                  <span className="font-medium">
                    {valid === "error" && `Collection already exists!`}
                  </span>
                </p>
              )}
            </div>

            <div className="flex justify-end w-full">
              <button
                disabled={valid === "error"}
                type="submit"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center ${
                  valid === "error" && "opacity-50 cursor-not-allowed"
                }`}
              >
                {false && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {"Edit"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
);

export default EditCollection;
