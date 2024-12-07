import { createContext, useState, useEffect } from "react";
import { fetchAllCollections } from "../controllers/collection";
import { fetchAllClients } from "../controllers/client";

export const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllClients();
        setClients(res);
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
    <ClientContext.Provider
      value={{
        clients,
        setClients,
        fetching,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
