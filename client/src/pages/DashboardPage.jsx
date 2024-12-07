import React, { useContext } from "react";
import StatCard from "../components/statcards/StatCard";
import { CollectionContext } from "../store/collectionContext";
import { ProductsContext } from "../store/productContext";
import { StockContext } from "../store/stockContext";
import { RetailBillContext } from "../store/retailBillContext";
import { ClientContext } from "../store/clientContext";
import { PurchasesContext } from "../store/purchaseContext";
import { toast } from "react-toastify";

const DashboardPage = ({ setAuth }) => {
  const { collections } = useContext(CollectionContext);
  const { products } = useContext(ProductsContext);
  const { stocks } = useContext(StockContext);
  const { retailBills } = useContext(RetailBillContext);
  const { clients } = useContext(ClientContext);
  const { purchases } = useContext(PurchasesContext);

  return (
    <>
      <div className="page">
        <div className="p-title">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="dashboard-container">
          <div className="statcards-container">
            <StatCard
              icon={<span className="material-icons">playlist_add</span>}
              color={"blue"}
              title={"Collections"}
              data={collections.length}
              stat={10}
              link={"collection"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">shopping_cart</span>}
              color={"red"}
              title={"Purchase"}
              data={purchases.length}
              stat={500}
              link={"purchase"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">add_business</span>}
              color={"slate"}
              title={"Products"}
              data={products.length}
              stat={25}
              link={"products"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">leaderboard</span>}
              color={"orange"}
              title={"Stocks"}
              data={stocks.length}
              stat={500}
              link={"stocks"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">person_search</span>}
              color={"purple"}
              title={"Clients"}
              data={clients.length}
              stat={1000}
              link={"clients"}
            ></StatCard>

            <StatCard
              icon={<span className="material-icons">receipt_long</span>}
              color={"teal"}
              title={"Bills"}
              data={retailBills.length}
              stat={3000}
              link={"bills"}
            ></StatCard>
            <StatCard
              icon={<span className="material-icons">paid</span>}
              color={"green"}
              title={"PNL"}
              data={1}
              stat={1}
              link={"revenue"}
            ></StatCard>
            {/* <button
              className="bg-blue-500 text-white px-3 py-2  mb-5"
              onClick={() => {
                setAuth(false);
                toast.success("Loged out!");
              }}
            >
              <span className="text nav-text">Logout</span>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
