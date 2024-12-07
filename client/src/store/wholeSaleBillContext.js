import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
import { fetchAllWholeSaleBills } from "../controllers/wholeSale";

export const WholeSaleContext = createContext({});

export const WholeSaleProvider = ({ children }) => {
  const [wholeSaleBills, setWholeSaleBills] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllWholeSaleBills();
        setWholeSaleBills(response);
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
    <WholeSaleContext.Provider
      value={{ wholeSaleBills, setWholeSaleBills, fetching }}
    >
      {children}
    </WholeSaleContext.Provider>
  );
};
