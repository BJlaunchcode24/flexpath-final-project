import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add token to every request if available
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
