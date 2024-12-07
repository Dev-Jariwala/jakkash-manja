import { createContext, useState, useEffect } from "react";
import { fetchAllCollections } from "../controllers/collection";
import { fetchAllClients } from "../controllers/client";
import { fetchAdmin } from "../controllers/admin";

export const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState([]);
  const [fetching, setFetching] = useState(true);
  const formData = localStorage.getItem("auth");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAdmin(JSON.parse(formData));
        // console.log(res);
        setAdmin(res);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // Set fetching to false regardless of success or failure
        setFetching(false);
      }
    };

    fetchData();
  }, [formData]); // Run this effect only once on component mount

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        fetching,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
