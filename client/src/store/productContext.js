import { createContext, useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

export const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}product`);
        setProducts(response.data.products);
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
    <ProductsContext.Provider value={{ products, setProducts, fetching }}>
      {children}
    </ProductsContext.Provider>
  );
};
