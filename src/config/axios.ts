import axios from "axios";
import config from "./config";

const appApiAxios = axios.create({
  baseURL: config.appApiBaseUrl,
});

export { appApiAxios };
