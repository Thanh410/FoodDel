import AxiosClient from "./axiosClient";
import { setToken } from "../utils/localStorage";

export const loginService = async (data) => {
  return await AxiosClient.post("/api/user/login", data);
};
