import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all stocks
export async function fetchAllStocks() {
  try {
    const response = await axios.get(`${BACKEND_URL}stock`);
    return response.data.stocks.reverse();
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw error;
  }
}

// Create a new stock entry for a product
export async function stockCreate(productId, formData) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}stock/${productId}`,
      formData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error creating stock entry:", error);
    throw error;
  }
}

// Fetch details of a stock entry by ID
export async function fetchStockDetails(stockId) {
  try {
    const response = await axios.get(`${BACKEND_URL}stock/${stockId}`);
    return response.data.stockDetails;
  } catch (error) {
    console.error("Error fetching stock details:", error);
    throw error;
  }
}

// Update stock entry by ID
export async function stockUpdate(stockId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}stock/${stockId}`,
      formData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error updating stock entry:", error);
    throw error;
  }
}

// Delete stock entry by ID
export async function stockDelete(stockId) {
  try {
    const response = await axios.delete(`${BACKEND_URL}stock/${stockId}`);
    return response;
  } catch (error) {
    console.error("Error deleting stock entry:", error);
    throw error;
  }
}
