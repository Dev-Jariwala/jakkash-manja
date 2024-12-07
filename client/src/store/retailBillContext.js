import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
import { fetchAllRetailBIll } from "../controllers/retail";

export const RetailBillContext = createContext({});

export const RetailBillProvider = ({ children }) => {
  const [retailBills, setRetailBIlls] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllRetailBIll();
        setRetailBIlls(response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // Set fetching to false regardless of success or failure
        setFetching(false);
      }
    };

    fetchData();
  }, []); // Run this effect only once on component mount

  return (
    <RetailBillContext.Provider
      value={{ retailBills, setRetailBIlls, fetching }}
    >
      {children}
    </RetailBillContext.Provider>
  );
};
