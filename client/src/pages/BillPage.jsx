import React, { useState } from "react";
import Retail from "../components/retail/Retail";
import WholeSale from "../components/wholesale/WholeSale";
import "./Bill.css";
import PageTitle from "../components/pageTemp/PageTitle";

const BillPage = () => {
  const [activeTab, setActiveTab] = useState("retail");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <PageTitle pageName={"Bills"}>
      <>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="mb-4 border-b border-blue-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="w-1/4">
                <button
                  className={`inline-block w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg  ${
                    activeTab === "retail"
                      ? "border-blue-500  dark:text-gray-200"
                      : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
                  } `}
                  type="button"
                  onClick={() => handleTabClick("retail")}
                >
                  Retail Bill
                </button>
              </li>
              <li className="w-1/4">
                <button
                  className={`inline-bloc w-full text-xl font-semibold p-4 border-b-2 rounded-t-lg  ${
                    activeTab === "wholesale"
                      ? "border-blue-500 dark:text-gray-200"
                      : "border-blue-200 text-gray-700 dark:border-gray-700 dark:text-gray-500"
                  } `}
                  type="button"
                  onClick={() => handleTabClick("wholesale")}
                >
                  Wholesale Bill
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>{activeTab === "retail" ? <Retail /> : <WholeSale />}</div>
      </>
    </PageTitle>
  );
};

export default BillPage;
