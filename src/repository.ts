import axios, { AxiosError, AxiosRequestHeaders } from "axios";
import { baseUrl } from "./constants";
const { REACT_APP_API_URL } = process.env;
const repository = axios.create({
  baseURL: REACT_APP_API_URL,
});

repository.interceptors.request.use(
  (config) => {
    const access_token = sessionStorage.getItem('access-token');
    if (access_token) {
      config.headers = {
        Authorization: `Bearer ${access_token}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);
repository.interceptors.response.use((response) => {

  return response
}, async (error) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refresh_token = localStorage.getItem('refresh-token')
    try {
      const tokens = await axios.get(baseUrl + '/auth/refresh', {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        }
      });

      if (!tokens) {
        localStorage.removeItem('refresh-token')
        return
      }
      sessionStorage.setItem('access-token', tokens.data.access_token);
      localStorage.setItem('refresh-token', tokens.data.refresh_token)

      // Retry the original request with the new token
      return repository(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('refresh-token')
      sessionStorage.removeItem('access-token')
      window.location.replace('http://localhost:3000/admin/auth/signin')
      return Promise.reject(refreshError);
    }
  } else {
    return Promise.reject(error);
  }

});




export default repository;
