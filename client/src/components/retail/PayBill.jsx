import React, { forwardRef } from "react";

const PayBill = forwardRef(({ canclePay, confirmPay, formData }, ref) => {
  return (
    <div className="pt-3 px-3 w-[400px]">
      <span className="material-icons text-[50px] text-green-600 text-center w-full">
        paid
      </span>
      <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">
        Are you sure{" "}
        <span className="font-medium text-red-500">
          ₹ {formData.totalDue}/-
        </span>{" "}
        recived for Bill No <span className="font-bold">{formData.BillNo}</span>{" "}
        ?
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          data-modal-toggle="deleteModal"
          type="button"
          onClick={canclePay}
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          No, cancel
        </button>
        <button
          type="submit"
          onClick={confirmPay}
          className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900"
        >
          Yes, I'm sure
        </button>
      </div>
    </div>
  );
});

export default PayBill;
