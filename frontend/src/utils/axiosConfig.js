import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isPublicEndpoint =
      (config.url.includes("/auth/login") || config.url.includes("/users")) &&
      config.method === "post";

    if (token && !isPublicEndpoint) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
