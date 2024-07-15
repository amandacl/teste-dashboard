import axios from "axios";
import { API_BASE_URL } from "../../../environment";
import { useAuth } from "src/app/context/auth-context";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const { isAuthenticated } = useAuth();

    const token = sessionStorage.getItem("token");

    if (
      token &&
      isAuthenticated &&
      config.headers &&
      !config.headers.Authorization
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export { api };
