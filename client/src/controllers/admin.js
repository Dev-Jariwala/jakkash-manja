import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all Clients
export async function fetchAdmin(formData) {
  try {
    const response = await axios.post(`${BACKEND_URL}admin`, formData, {
      withCredentials: true,
    });
    return response.data.admin ? response.data.admin : response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
