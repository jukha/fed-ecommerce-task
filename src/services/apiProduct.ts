import axios from "axios";
import { handleApiError } from "./handleApiError";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`${PRODUCTS_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_API_URL);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
