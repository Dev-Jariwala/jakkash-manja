import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all products
export async function fetchAllProducts() {
  try {
    const response = await axios.get(`${BACKEND_URL}product`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
// Fetch all products
export async function getProductSales() {
  try {
    const response = await axios.get(`${BACKEND_URL}product/productSales`);
    return response.data.productSalesData;
  } catch (error) {
    console.error("Error fetching productsales:", error);
    throw error;
  }
}

// Create a new product
export async function productCreate(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}product`, formData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Update product by ID
export async function productUpdate(productId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}product/${productId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete product by ID
export async function productDelete(productId) {
  try {
    const response = await axios.delete(`${BACKEND_URL}product/${productId}`);
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Fetch details of a product by ID
export async function fetchProductDetails(productId) {
  try {
    const response = await axios.get(`${BACKEND_URL}product/${productId}`);
    return response.data.productDetails;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}
// Mute product by ID
export async function productMute(productId, formData) {
  try {
    const response = await axios.put(
      `${BACKEND_URL}product/mute/${productId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
