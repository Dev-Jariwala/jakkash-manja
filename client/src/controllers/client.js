import axios from "axios";
import BACKEND_URL from "../assets/BACKEND_URL";

// Fetch all Clients
export async function fetchAllClients() {
  try {
    const response = await axios.get(`${BACKEND_URL}client`);
    return response.data.clients;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
