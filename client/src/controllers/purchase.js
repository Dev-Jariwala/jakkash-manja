import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all products
export async function fetchAllPurchases() {
  try {
    const response = await axios.get(`${BACKEND_URL}purchase`);
    return response.data.purchases;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
}

// Create a new product
export async function purchaseCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}purchase`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error creating purchase:", error);
    throw error;
  }
}

// Update product by ID
export async function purchaseUpdate(purchaseId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}purchase/${purchaseId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating purchase:", error);
    throw error;
  }
}

// Delete product by ID
export async function purchaseDelete(purchaseId) {
  try {
    const response = await axios.delete(`${BACKEND_URL}purchase/${purchaseId}`);
    return response;
  } catch (error) {
    console.error("Error deleting purchase:", error);
    throw error;
  }
}
