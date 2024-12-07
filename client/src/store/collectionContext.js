import { createContext, useState, useEffect } from "react";
import { fetchAllCollections } from "../controllers/collection";

export const CollectionContext = createContext({});

export const CollectionProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [activeColl, setActiveColl] = useState({});
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllCollections();
        setCollections(res);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        // Set fetching to false regardless of success or failure
        setFetching(false);
      }
    };

    fetchData();
  }, []); // Run this effect only once on component mount
  useEffect(() => {
    setActiveColl(collections?.find((coll) => coll.active));
  }, [collections]);

  return (
    <CollectionContext.Provider
      value={{
        collections,
        setCollections,
        activeColl,
        setActiveColl,
        fetching,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
