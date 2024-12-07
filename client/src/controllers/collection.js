import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Set active collection
export async function setActiveCollection(collectionId) {
  try {
    await axios.put(`${BACKEND_URL}collection/${collectionId}`, null, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fetch all collections
export async function fetchAllCollections() {
  try {
    const response = await axios.get(`${BACKEND_URL}collection`);
    return response.data.sanitizedCollections;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get collection details by ID
export async function getCollectionDetails(collectionId) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}collection/${collectionId}`
    );
    return response.data.collectionDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete collection by ID
export async function collectionDelete(collectionId) {
  try {
    await axios.delete(`${BACKEND_URL}collection/${collectionId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Create a new collection
export async function collectionCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}collection`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Update collection by ID
export async function collectionUpdate(collectionId, formData) {
  try {
    await axios.put(
      `${BACKEND_URL}collection/update/${collectionId}`,
      formData,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
