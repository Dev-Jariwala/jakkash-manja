import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export const PurchasesContext = createContext({});

export const PurchasesProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}purchase`);
        setPurchases(response.data.purchases);
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
    <PurchasesContext.Provider value={{ purchases, setPurchases, fetching }}>
      {children}
    </PurchasesContext.Provider>
  );
};
