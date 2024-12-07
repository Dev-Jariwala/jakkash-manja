import React, { useState, useEffect, useContext } from "react";
import PageTitle from "../components/pageTemp/PageTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RetailBillContext } from "../store/retailBillContext";
import { WholeSaleContext } from "../store/wholeSaleBillContext";
import { PurchasesContext } from "../store/purchaseContext";
const Revenue = () => {
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();
  const [pnl, setPNL] = useState([]);
  const { retailBills } = useContext(RetailBillContext);
  const { wholeSaleBills } = useContext(WholeSaleContext);
  const { purchases } = useContext(PurchasesContext);

  useEffect(() => {
    const getStudentdata = async () => {
      const retailTotal = retailBills.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);
      const wholesaleTotal = wholeSaleBills.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);
      const purchaseTotal = purchases.reduce((acc, curr) => {
        return acc + curr.rate * curr.quantity;
      }, 0);

      setPNL([retailTotal, wholesaleTotal, purchaseTotal]);
      //console.log(resData);
    };

    getStudentdata();
  }, []);

  useEffect(() => {
    const handleRevenueClick = async () => {
      const enteredPassword = prompt("Enter password for Revenue:");
      // Check if the entered password is correct (you should replace 'yourPassword' with the actual correct password)
      if (enteredPassword === "jakkash@123") {
        setIsPasswordValid(true);
        toast.success("Access Granted!");
      } else if (enteredPassword === "jakkash@321") {
        setIsPasswordValid("Jakash");
        // toast.success("Access Granted!");
      } else {
        navigate("/");
        // Show a toast or any other notification indicating invalid password
        toast.error("Invalid password. Access denied!");
      }
    };
    handleRevenueClick();
  }, []);

  return (
    <>
      {isPasswordValid && (
        <PageTitle pageName={"Revenue"}>
          <div className="text-xl font-bold text-gray-700 w-[90%] mx-auto mt-7 dark:text-gray-300">
            PNL REPORT:
          </div>
          <div
            class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 w-[90%] mx-auto mt-5"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <dl class="grid grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-4 dark:text-white sm:p-8">
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">
                  {Intl.NumberFormat("en-US").format(pnl[2])}/-
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">Investment</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">
                  {Intl.NumberFormat("en-US").format(pnl[0])}/-
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">Retail Sales</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">
                  {Intl.NumberFormat("en-US").format(pnl[1])}/-
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  Wholesale sales
                </dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">
                  {Intl.NumberFormat("en-US").format(pnl[1] + pnl[0] - pnl[2])}
                  /-
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">Profit</dd>
              </div>
            </dl>
          </div>
        </PageTitle>
      )}
    </>
  );
};

export default Revenue;
