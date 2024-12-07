import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";
import { fetchAllStocks } from "../controllers/stock";

export const StockContext = createContext({});

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using Axios
        const res = await fetchAllStocks();
        setStocks(res);
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
    <StockContext.Provider value={{ stocks, setStocks, fetching }}>
      {children}
    </StockContext.Provider>
  );
};
