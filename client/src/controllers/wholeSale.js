import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all whole sale bills
export async function fetchAllWholeSaleBills() {
  try {
    const response = await axios.get(`${BACKEND_URL}wholesale`);
    return response.data.wholeSaleBills.reverse();
  } catch (error) {
    console.error("Error fetching wholesale bills:", error);
    throw error;
  }
}

// Create a new wholesale
export async function wholeSaleBillCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}wholesale`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error creating wholesalebill:", error);
    throw error;
  }
}

// Update product by ID
export async function wholeSaleBillUpdate(wholeSaleId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}wholesale/${wholeSaleId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating wholesalebill:", error);
    throw error;
  }
}
// Update totalDue by ID
export async function updateTotalDue(wholeSaleBill) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}wholesale/paid/${wholeSaleBill}`,
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
