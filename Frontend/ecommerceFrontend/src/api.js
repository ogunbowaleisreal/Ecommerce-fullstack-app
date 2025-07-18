import axios from "axios";
import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";

const useAxios = () => {
  const { accessToken, setAccessToken } = useAuth();

  // Create axios instance once
  const api = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:3500',
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      res => res,
      async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await axios.get(
              'http://localhost:3500/refresh',
              { withCredentials: true }
            );
            const newToken = res.data.access_token;
            setAccessToken(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
          }
        }
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors on unmount or when accessToken changes
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return api;
};

export default useAxios;
