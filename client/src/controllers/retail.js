import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all products
export async function fetchAllRetailBIll() {
  try {
    const response = await axios.get(`${BACKEND_URL}retail`);
    return response.data.retailBills.reverse();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Create a new product
export async function retailbillCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}retail`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error creating retailbill:", error);
    throw error;
  }
}

// Update product by ID
export async function retailbillUpdate(retailbillId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}retail/${retailbillId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating retailbill:", error);
    throw error;
  }
}
// Update totalDue by ID
export async function updateTotalDue(retailbillId) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}retail/paid/${retailbillId}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating total Due:", error);
    throw error;
  }
}
