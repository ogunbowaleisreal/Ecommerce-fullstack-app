import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenService";


const axiosInstance = axios.create({
    baseURL:'http://localhost:3500',
    withCredentials:true
})


// Request interceptor: add Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 by refreshing token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token using HTTP-only cookie
        const res = await axiosInstance.get("/refresh", { withCredentials: true });
        const newToken = res.data.access_token;

        // Save new access token
        setAccessToken(newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh failed, clear token
        clearAccessToken();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance