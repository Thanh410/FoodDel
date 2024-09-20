import { getToken } from "../utils/localStorage";
import AxiosClient from "./axiosClient";

export const getFoods = () => {
  return AxiosClient.get("/api/food/list");
};

export const getCarts = () => {
  return AxiosClient.post("/api/cart/get");
};

export const addToCartService = (itemId) => {
  return AxiosClient.post(
    "/api/cart/add",
    { itemId },
    { headers: { token: getToken() } }
  );
};

export const removeFromCartService = (itemId) => {
  return AxiosClient.post(
    "/api/cart/remove",
    { itemId },
    { headers: { token: getToken() } }
  );
};
