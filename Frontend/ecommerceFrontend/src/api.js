import axios from "axios";
import { useEffect, useMemo, } from "react";
import {useNavigate} from 'react-router-dom'
import { setToken } from "../reduxfeatures/authslicer";
import { useDispatch,useSelector } from "react-redux";

const useAxios = () => { 
  const token = useSelector((state)=>state.auth.token)
  const dispatch = useDispatch()

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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
            dispatch(setToken(newToken));

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);

            if(refreshError.response?.status === 403 && !originalRequest._retry && refreshError.response?.data.message == 'refreshtokenexpired'){
          dispatch(setToken(null))
          window.location.href = '/login'
        }
          }
        }else if(err.response?.status === 403 && !originalRequest._retry && err.response?.data.message == 'refreshtokenexpired'){
          dispatch(setToken(null))
          window.location.href = '/login'
        }
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors on unmount or when accessToken changes
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  return api;
};

export default useAxios;
