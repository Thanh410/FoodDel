import axios from "axios";
import { parse, stringify } from "qs";
import { getToken, setToken } from "../utils/localStorage";
import { API_ENDPOINT } from "../utils/varibaleLocal";

const AxiosClient = axios.create({
  baseURL: API_ENDPOINT,
  responseType: "json",
  timeout: 50000,
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

AxiosClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;
    if (getToken()) {
      newConfig.headers.Authorization = `Bearer ${getToken()}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosClient;
